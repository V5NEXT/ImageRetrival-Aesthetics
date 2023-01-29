import cv2
from scipy.spatial.distance import euclidean
from sklearn.metrics.pairwise import cosine_similarity
from scipy.spatial.distance import euclidean
import numpy as np
from sklearn.cluster import SpectralClustering
import os
from tensorflow.keras.preprocessing.image import load_img, img_to_array

dir_path = "./dataset/test_dataset/"
files = os.listdir(dir_path)


def extract_featureHSV(im_path):
    # Load image
    img = cv2.imread(im_path)
    # Convert to HSV color space
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    # Extract the hue channel
    hsv = hsv[:, :, 0].ravel()
    return hsv[0:40000]  # feature vector

# from sklearn.cluster import KMeans

# # reshape the hue channel to a 2D array
# X = hue.reshape(-1,1)

# # perform k-means clustering
# kmeans = KMeans(n_clusters=3, random_state=0).fit(X)


# calculate the cosine similarity between two feature vectors
# similarity = cosine_similarity(feature_vector1.reshape(1, -1), feature_vector2.reshape(1, -1))


def create_similarity_matrix(image_features, distance_measure):
    # create an empty similarity matrix with the same number of rows and columns as the number of images in the dataset
    num_images = len(image_features)
    similarity_matrix = np.zeros((num_images, num_images))

    if distance_measure == "euclidean":
        distance = euclidean
    elif distance_measure == "cosine_similarity":
        def distance(x, y): return cosine_similarity(
            x.reshape(1, -1), y.reshape(1, -1))
    elif distance_measure == "manhattan":
        def distance(x, y): return np.sum(np.abs(np.array(x)-np.array(y)))
    else:
        print("Provide a similarity measure")

    # calculate the euclidean distance between all pairs of images and store the result in the similarity matrix
    for i in range(num_images):
        for j in range(i, num_images):
            similarity_matrix[i, j] = distance(
                image_features[i], image_features[j])
            similarity_matrix[j, i] = similarity_matrix[i, j]
    return similarity_matrix


features = []
for file in files:
    file = os.path.join(dir_path, file)
    feature = extract_featureHSV(file)
    features.append(feature)


image_features = features.copy()

similarity_mat = create_similarity_matrix(image_features, "manhattan")

# use Spectral Clustering to partition the data into 5 clusters
clustering = SpectralClustering(
    n_clusters=2, affinity='precomputed').fit(similarity_mat)

# get the cluster assignments for each image
cluster_assignments = clustering.labels_

name_and_cluster = zip(files, cluster_assignments)
# print(list(name_and_cluster))
