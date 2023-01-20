import tensorflow as tf
import numpy as np
import cv2
from tensorflow.keras.applications import ResNet50, VGG16, InceptionV3
import json

def extract_featureHSV(im_path):
    # Load image
    img = cv2.imread(im_path)
    new_size = (50, 50)
    resized_img = cv2.resize(img, new_size)
    # Convert to HSV color space
    hsv = cv2.cvtColor(resized_img, cv2.COLOR_BGR2HSV)
    # Extract the hue channel
    hsv = hsv[:,:,0].ravel()
    return hsv[0:2500] # feature vector

# Load the pre-trained ResNet50 model
def extract_features_image(model, image_path):
    if model == 'VGG16':
        image = tf.io.read_file(image_path)
        image = tf.image.decode_jpeg(image, channels=3)
        image = tf.image.resize(image, [224, 224])
        image = tf.keras.applications.vgg16.preprocess_input(image)
        model = VGG16(weights='imagenet')
        image_batch = tf.expand_dims(image, axis=0)
        features = model.predict(image_batch)
        feature = features[0]

    elif model == 'InceptionV3':
        image = tf.io.read_file(image_path)
        image = tf.image.decode_jpeg(image, channels=3)
        image = tf.image.resize(image, (299, 299))
        image = tf.keras.applications.inception_v3.preprocess_input(image)
        #Load InceptionV3 model
        model = InceptionV3(weights='imagenet')
        image_batch = tf.expand_dims(image, axis=0)
        features = model.predict(image_batch)
        feature = features[0]

    elif model == 'ResNet50':
        image = tf.io.read_file(image_path)
        image = tf.image.decode_jpeg(image, channels=3)
        image = tf.image.resize(image, [224, 224])
        image = tf.keras.applications.resnet50.preprocess_input(image)
        model = ResNet50(weights='imagenet')
        image_batch = tf.expand_dims(image, axis=0)
        features = model.predict(image_batch)
        feature = features[0]

    elif model == "Color":
        feature = extract_featureHSV(image_path)

    feature = [np_array.tolist() for np_array in feature]
    output = {"filename" : image_path,
              "feature" : feature}

    return json.dumps(output)

test_image_path = "dataset_test/test.jpg"
new_json = extract_features_image('VGG16', test_image_path)
print(new_json)