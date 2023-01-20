from flask import Flask, request, send_file, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])


@app.route("/upload", methods=["POST"])
def handle_upload():
    # Get the uploaded file
    image_file = request.files.get("file")
    if image_file:
        try:
            # Save the file to disk
            image_file.save("Image/image.jpg")
            return jsonify({"message": "File uploaded successfully"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "No file found"}), 400


@app.route("/features")
def members():
    return {"members": ["Member1", "Member2", "Member3", "Member4", "Member5"]}


if __name__ == '__main__':
    app.run(debug=True, port=5000)
