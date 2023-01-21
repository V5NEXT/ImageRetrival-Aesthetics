from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from extract_features_image import *
from features_to_kmeans_pca import *
import os

app = Flask(__name__)
# CORS(app, origins=["http://localhost:3000/"])
CORS(app)

@app.route("/upload", methods=["POST"])
def handle_upload():
    # Get the uploaded file
    image_file = request.files.get("file")
    if image_file:
        try:
            # Save the file to disk
            image_file.save(os.path.join(app.root_path, "Image/image.jpg")) 

            # uploaded img json {"filename" : [], "feature" : []}
            response = extract_features_image("Color", os.path.join(app.root_path, "Image/image.jpg")) 
            output = featuresToKmeansPCA( os.path.join(app.root_path, "features/features_color.json"), 20, 4, response)
            print(output)
            return jsonify({"message": output}), 200
        except Exception as e:
            print(e)
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "No file found"}), 400

# @app.route("/run", methods=["GET"])
# def handle_run():
#     if image_file != None:
#         params = []
#         response = extract_features_image(model, os.path.join(app.root_path, "Image/image.jpg")) 
#         output = featuresToKmeansPCA( os.path.join(app.root_path, "features/features_" + model + ".json"), n_images, n_clusters, response)

@app.route("/images", methods=["GET"])
def getImages():
    if request.args.get("path") != None:
        return send_file(os.path.join(app.root_path, request.args.get("path")), mimetype="image/jpeg")
    else:
        return jsonify({"error": "No path provided"}), 400

@app.route("/features")
def members():
    return {"members": ["Member1", "Member2", "Member3", "Member4", "Member5"]}


if __name__ == '__main__':
    app.run(debug=True, port=5000)
