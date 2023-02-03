from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from extract_features_image import *
from features_to_kmeans_pca import *
import os
import matplotlib.pyplot as plt
from aestetics_score import *
from get_info import *
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
            img_info = getInfo(os.path.join(app.root_path, "Image/image.jpg"))

            return jsonify({"message": img_info}), 200
        except Exception as e:
            print(e)
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "No file found"}), 404


@app.route("/filters", methods=["POST"])
def handle_run():
    # Get the uploaded file

    data = request.get_data()
    if data:
        try:
            data = data.decode()
            data_json = json.loads(data)
            method = data_json["method"]
            n_clusters = data_json["clusters"]
            n_images = data_json["images"]
            print(type(method), type(n_images), type(n_clusters))

            # uploaded img json {"filename" : [], "feature" : []}
            uploaded_image_json = extract_features_image(
                method, os.path.join(app.root_path, "Image/image.jpg"))
            output = featuresToKmeansPCA(os.path.join(
                app.root_path, "features/features_" + method + ".json"), n_images, n_clusters, uploaded_image_json)
            fig = plotPCA(output)
            fig.savefig(os.path.join(app.root_path, "Image/fig.jpg"))
            print(output)

            thresholded, edges = tresh_edges(
                os.path.join(app.root_path, "Image/image.jpg"))

            cv2.imwrite(os.path.join(app.root_path,
                        "Image/thresholded.jpg"), thresholded)
            cv2.imwrite(os.path.join(app.root_path, "Image/edges.jpg"), edges)

            output_json = json.loads(output)
            print(output)
            filenames = output_json["filenames"]
            print(filenames)

            # Aestetic scores
            scores_arr = []
            for file in filenames:
                score = calculate_aesthetics(file)
                scores_arr.append(score)
            scores = [int(x) for x in scores_arr]
            print(scores)
            mean_score = int(np.mean(scores))

            # List of images links
            links = []
            for i in range(len(filenames)):
                img_name = filenames[i][8:-1]
                print(img_name)
                links.append(
                    "http://localhost:5000/images?path=dataset%2F" + img_name + "g")

            cluster_assign = output_json["cluster_assignments"]
            link_and_cluster = list(zip(links, cluster_assign))

            final_output = {
                "scatterPlot": "http://localhost:5000/images?path=Image%2Ffig.jpg",
                "silouttePlot": "http://localhost:5000/images?path=Image%2Fsilhouette_plot.png",
                "cordinates": output,
                "aesthetics": {
                                "threshold": "http://localhost:5000/images?path=Image%2Fthresholded.jpg",
                                "canny": "http://localhost:5000/images?path=Image%2Fedges.jpg",
                                "scores": scores,
                                "avg_score": mean_score,
                                "links_and_cluster": link_and_cluster,
                                "links": links
                }
            }
            return jsonify({"message": final_output}), 200
        except Exception as e:
            print(e)
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "No file found"}), 404

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
