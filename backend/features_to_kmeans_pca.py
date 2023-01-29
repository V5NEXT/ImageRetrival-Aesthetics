from sklearn.cluster import KMeans
import numpy as np
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
import json
import random


def featuresToKmeansPCA(json_path, n_images, n_clusters, uploaded_img_json):
    """
    Input: 
    json_path :: path to precomputed features {"filenames" : [] , "features" : []}
    n_images :: n images to process
    n_cluster :: n clusters for kmeans
    uploaded_img_json :: json (STRING or PATH ???) of the uploaded image {"filename" : [] , "feature" : []}
    """
    # json_path = "features/features_color.json"
    # json_path = "features/features_InceptionV3.json"
    # json_path = "features/features_ResNet50.json"

    # output = {"filenames" : filenames,
    #         "coordinates" : coordinates,
    #         "cluster_assignments" : clusters_list,
    #         "cluster_centers" : cluster_centers_list
    #         }

    indexes = random.sample(range(0, 2856), n_images)
    indexes.sort()

    # Upload file
    data = json.load(open(json_path))
    filenames = data["filenames"]
    X = data["features"]

    # Upload json of the new image
    # data_new_img = json.load(open(uploaded_img_json)) if it will be a path
    data_new_img = json.loads(uploaded_img_json)
    new_img_filename = data_new_img["filename"]
    new_img_feature = data_new_img["feature"]

    filenames.append(new_img_filename)
    X.append(new_img_feature)

    filenames = np.array(filenames)[np.array(indexes)]
    filenames = filenames.tolist()

    X = np.array(X)[np.array(indexes)]
    X = X.tolist()

    # Create a KMeans object and fit the data
    kmeans = KMeans(n_clusters=n_clusters, random_state=0).fit(X)

    # Get the cluster assignments for each data point
    clusters = kmeans.predict(X)

    cluster_centers = list(
        zip(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1]))

    # Perform PCA on the features
    pca = PCA(n_components=5)
    principal_components = pca.fit_transform(X)

    # x and y-axes correspond to the first two principal components.
    # x_coord = principal_components[:, 0]
    # y_coord = principal_components[:, 1]

    coordinates = list(
        zip(principal_components[:, 0], principal_components[:, 1]))

    cluster_centers = pca.transform(kmeans.cluster_centers_)
    cluster_centers_list = [np_array.tolist() for np_array in cluster_centers]

    # # Plot the clusters using PCA
    # plt.scatter(principal_components[:, 0], principal_components[:, 1], c=clusters)
    # plt.scatter(cluster_centers[:, 0], cluster_centers[:, 1], color="red")
    # plt.show()

    clusters_list = clusters.tolist()

    output = {"filenames": filenames,
              "coordinates": coordinates,
              "cluster_assignments": clusters_list,
              "cluster_centers": cluster_centers_list
              }
    json_string = json.dumps(output)

    return json_string


def plotPCA(json_string):
    fig = plt.figure(dpi=300)
    ax = fig.add_subplot(1, 1, 1)
    data_to_plot = json.loads(json_string)
    clusters = np.array(data_to_plot["cluster_assignments"])
    cluster_centers = np.array(data_to_plot["cluster_centers"])
    coordinates = np.array(data_to_plot["coordinates"])
    for i in set(clusters):
        ax.scatter(coordinates[clusters == i, 0], coordinates[clusters ==
                   i, 1], c=np.random.rand(3,), label=f'Cluster {i}')
        # ax.scatter(coordinates[:, 0], coordinates[:, 1], c=clusters, label=[f'Cluster {i}' for i in set(clusters)])
    ax.scatter(cluster_centers[:, 0], cluster_centers[:,
               1], color="red", label="Cluster centers")
    ax.scatter(coordinates[-1, 0], coordinates[-1, 1],
               s=100, color="black", marker='x', label="Your image")
    ax.legend()
    ax.set_title('Scatter plot of clusters')
    return fig
