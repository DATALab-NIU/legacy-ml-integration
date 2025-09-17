"""
    Proof-of-concept Flask API to serve as a backend for accessing the inference features of different models.
    :author: Ashiqur Rahman
"""
from flask import Flask, jsonify
from flask_cors import CORS
import time
import os
import glob
import numpy as np
import json
from PIL import Image
import base64
from io import BytesIO

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'


# @app.before_request
# def before():
#     # Use this method for authentication and other pre-request tasks.
#     print("This is executed BEFORE each request.")

@app.route('/', methods=['GET'])
def index():
    """
    Root endpoint to check if the service is running.
    :return: String message indicating the service is running.
    """
    return "Welcome to the root of the API service. Please use the /api/v1/predict/<threshold>/ endpoint to get predictions."


@app.route('/api/v1/base/', methods=['GET'])
def base():
    """
    Default endpoint to get predictions with a default threshold of 0.5
    :return: JSON response containing base64 encoded images and metadata
    """
    threshold = 0.5
    return_data = get_predicted_images(threshold)
    return jsonify(json.dumps(return_data))


@app.route('/api/v1/predict/<string:threshold>/', methods=['GET', 'POST'])
def predict(threshold):
    """
    Endpoint to get predictions based on the provided threshold.
    :param threshold: float value to adjust the prediction sensitivity.
    :return: JSON response containing base64 encoded images and metadata
    """
    threshold = float(threshold)
    # We are using a mock function to simulate predictions.
    # However, in a real-world application, receive the chosen model from the user
    # and call the appropriate method based on that.
    return_data = get_predicted_images(threshold)
    return jsonify(json.dumps(return_data))


def get_predicted_images(threshold):
    """
    Function to load images from the data directory, apply thresholding, and return base64 encoded images.
    :param threshold: float value to adjust the prediction sensitivity.
    :return: Object response containing base64 encoded images and metadata
    """
    # For a real-world implementation, use a parameter for data directory
    data_dir = r'./data'

    # For this proof-of-concept, we assume the data directory contains .npy files with scan data.
    files = glob.glob(os.path.join(data_dir, '*.npy'))
    return_data = {}
    images = []
    image_file_names = []
    for file in files:
        f = np.load(os.path.join(data_dir, file))
        upscaled_file = f * 255 * threshold
        img = Image.fromarray(upscaled_file, 'RGB').convert('1')
        buffered = BytesIO()
        img.save(buffered, format='PNG')
        encoded_img = str(base64.b64encode(buffered.getvalue()).decode('utf-8'))
        images.append(encoded_img)
        image_file_names.append(file.split(os.path.sep)[-1:])

    return_data['base_path'] = data_dir
    return_data['images'] = images
    return_data['image_file_names'] = image_file_names
    return_data['threshold'] = threshold
    return return_data


if __name__ == '__main__':
    """
    Main function to run the Flask app.
    """
    # Set the port to 105 to avoid conflicts with common services.
    app.run(host='0.0.0.0', port=105)
