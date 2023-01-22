import cv2
import json

def getInfo(im_path):
    # load image
    img = cv2.imread(im_path)

    # get image dimensions
    height, width, depth = img.shape

    output = {"height" : height,
              "width" : width,
              "depth" : depth}

    return json.dumps(output)