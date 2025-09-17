/**
 * Script to handle the frontend. This scripts uses jQuery to make AJAX calls
 * to the backend API and visualize the response.
 *
 * @author Ashiqur Rahman
 * @author_url http://ashiqur.com
 **/
$(document).ready(function () {
    let server_location = $('#api-server-location').val();

    load_data();

    function load_data() {
        /**
         * Load initial data and send a request to the `base` path of the API.
         */
        $.ajax({
            url: server_location + '/base/',
            method: 'GET',
            success: return_data => {
                let response = JSON.parse(return_data);
                console.log(response);
                $('#model-result').find('.placeholder-box').addClass('d-none');
                $('#model-result').find('.result-value').html('');
                $('#scans-directory').val(response.base_path);
                $('#model-threshold').val(response.threshold);
                $('#threshold-value').find('.value')
                    .removeClass('placeholder')
                    .text('Current threshold: ' + response.threshold);

                response.images.forEach((img, index) => {
                    let html_box = '<div class="col-12 col-lg-6">' +
                        '                            <div class="card" aria-hidden="true">' +
                        '                                <img src="data:image/png;base64, ' + img + '" class="card-img-top img-fluid">' +
                        '                                <div class="card-body">' +
                        '                                    <h5 class="card-title">' +
                        '                                        <span class="">' + response.image_file_names[index] + '</span>' +
                        '                                    </h5>' +
                        '                                    <a href="#" data-bs-toggle="modal" data-bs-target="#expanded-image-modal" data-bs-image="' + img + '" data-bs-title="' + response.image_file_names[index] + '" tabindex="-1" class="btn btn-primary col-6">Expand</a>' +
                        '                                </div>' +
                        '                            </div>' +
                        '                        </div>';
                    $('#model-result').find('.result-value').append(html_box);
                });

                $('#model-result').find('.result-value').removeClass('d-none');
            }
        })
    }

    $(document).on('change', '#model-threshold', function (e) {
        /**
         * Update the predictions when the threshold slider is changed.
         */

        e.preventDefault()

        // $('#model-result').find('.placeholder-box').removeClass('d-none');
        // $('#model-result').find('.result-value').addClass('d-none');
        $('#threshold-value').find('.value')
            .addClass('placeholder')
            .text('Current threshold: ' + $(this).val());
        $.ajax({
            url: server_location + '/predict/' + $(this).val(),
            method: 'GET',
            success: return_data => {
                let response = JSON.parse(return_data);
                console.log(response);
                $('#model-result').find('.placeholder-box').addClass('d-none');
                $('#model-result').find('.result-value').html('');
                $('#scans-directory').val(response.base_path);
                $('#model-threshold').val(response.threshold);
                $('#threshold-value').find('.value')
                    .removeClass('placeholder')
                    .text('Current threshold: ' + response.threshold);

                response.images.forEach((img, index) => {
                    let html_box = '<div class="col-12 col-lg-6">' +
                        '                            <div class="card" aria-hidden="true">' +
                        '                                <img src="data:image/png;base64, ' + img + '" class="card-img-top">' +
                        '                                <div class="card-body">' +
                        '                                    <h5 class="card-title">' +
                        '                                        <span class="">' + response.image_file_names[index] + '</span>' +
                        '                                    </h5>' +
                        '                                    <a href="#" data-bs-toggle="modal" data-bs-target="#expanded-image-modal" data-bs-image="' + img + '" data-bs-title="' + response.image_file_names[index] + '" tabindex="-1" class="btn btn-primary col-6">Expand</a>' +
                        '                                </div>' +
                        '                            </div>' +
                        '                        </div>';
                    $('#model-result').find('.result-value').append(html_box);
                });

                $('#model-result').find('.result-value').removeClass('d-none');
            }
        })
    });

    $('#expanded-image-modal').on('show.bs.modal', function(e){
        const button = e.relatedTarget;
        const image = $(button).attr('data-bs-image');
        const title = $(button).attr('data-bs-title');

        $('#expanded-image-modal').find('.modal-title').text(title);
        $('#expanded-image-modal').find('.modal-body').html('<img class="img-fluid w-100" src="data:image/png;base64, ' + image + '" />');
    })
});