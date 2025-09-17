# ML Integration Framework for Legacy Systems
We present an API-based framework designed to overcome the challenges of integrating ML models in legacy systems. The framework offers a lightweight, browser-based front-end interface to handle model parameters and an API backend to perform model inference.

## [API](model-api)
This directory contains the backend API implementation using Flask. It provides endpoints for model inference and parameter management. Internal comments within the source code explain the functionality of each component.

### Endpoints
##### `/` (GET)
- Returns a welcome message indicating that the API is running.

#### `/base` (GET)
- Performs prediction with a default threshold of 0.5.
- Returns the prediction result.

##### `/predict` (GET, POST)
- Requires the threshold parameter to be passed in the request body.
- Returns the prediction result based on the provided threshold.

## [Front-end](model-frontend)
This directory contains the front-end implementation using HTML, CSS, and JavaScript. It provides a user-friendly interface for interacting with the ML models, allowing users to input parameters and view results. User can choose the directory for the source files to be sent to the backend.

---
## Citation
If you find this framework useful in your research, please consider citing the following paper:

```bibtex
@inproceedings{rahman2025ml,
  title={Proposing a Framework for Machine Learning Adoption on Legacy Systems},
  author={Rahman, Ashiqur and Alhoori, Hamed},
  booktitle={Proceedings of the IEEE ICDM 2025 Workshop},
  year={2025},
  organization={ICDM}
}
```