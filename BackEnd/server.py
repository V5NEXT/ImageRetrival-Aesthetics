from flask import Flask, request, send_file, jsonify
from PIL import Image
import io
import tensorflow as tf
from tensorflow import keras
import numpy as np

app = Flask(name)


@app.route("/resize", methods=["POST"])
def handle_resize():
    # Get the uploaded file
    image_file = request.files.get("file")
    if image_file:
        try:
            # Open the image using PIL
            image = Image.open(image_file)
            # Resize the image
            image = image.resize((100, 100))
            # Save the image to a BytesIO object
            with io.BytesIO() as buffer:
                image.save(buffer, format="JPEG")
                # Get the image data and return it as a response
                image_data = buffer.getvalue()
                return image_data, 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "No file found"}), 400


@app.route("/upload", methods=["POST"])
def handle_upload():
    # Get the uploaded file
    image_file = request.files.get("file")
    if image_file:
        try:
            # Save the file to disk
            image_file.save("images/image.jpg")
            return jsonify({"message": "File uploaded successfully"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "No file found"}), 400


@app.route("/features")
def members():
    return {"members": ["Member1", "Member2", "Member3", "Member4", "Member5", "Egorka", "Ekaterina"]}


if name == 'main':
    app.run(debug=True, port=5000)
