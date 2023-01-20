import tensorflow as tf
from tensorflow import keras
from flask import Flask, request
import numpy as np

app = Flask(__name__)

# Load the ResNet50 model
model = keras.applications.ResNet50(weights='imagenet')

@app.route('/extract_features', methods=['POST'])
def extract_features():
    image = request.files['image']
    image = keras.preprocessing.image.load_img(image, target_size=(224, 224))
    image = keras.preprocessing.image.img_to_array(image)
    image = keras.applications.resnet50.preprocess_input(image)
    image = np.expand_dims(image, axis=0)

    # Extract features
    features = model.predict(image)
    return features.tolist()

if __name__ == '__main__':
    app.run(debug=True)
