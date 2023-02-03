from sklearn.cluster import KMeans
import numpy as np
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
import json
import random
from sklearn.metrics import silhouette_samples, silhouette_score


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
    silhouetteScore(X, clusters, n_clusters)

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


def silhouetteScore(X, clusters, n_clusters):
    # Calculate the silhouette scores for each sample
    silhouette_scores = silhouette_samples(X, clusters)
    # Calculate the mean silhouette score
    silhouette_avg = np.mean(silhouette_scores)
    print("The mean silhouette score is:", silhouette_avg)

    # Plot the silhouette plot
    fig, ax = plt.subplots()
    y_lower = 10
    for i in range(n_clusters):
        # Get the silhouette scores for samples in cluster i
        cluster_silhouette_scores = silhouette_scores[clusters == i]
        cluster_silhouette_scores.sort()

        size_cluster_i = len(cluster_silhouette_scores)
        y_upper = y_lower + size_cluster_i

        color = plt.cm.Spectral(float(i) / n_clusters)
        ax.fill_betweenx(np.arange(y_lower, y_upper), 0, cluster_silhouette_scores,
                         facecolor=color, edgecolor=color, alpha=0.7)
        ax.text(-0.05, y_lower + 0.5 * size_cluster_i, str(i))

        y_lower = y_upper + 10

    ax.axvline(x=silhouette_avg, color="red",
               linestyle="--", label="Mean silhouette score")
    ax.set_yticks([])
    ax.set_xlim([-0.2, 1])
    ax.set_xlabel("Silhouette Coefficient")
    ax.set_ylabel("Cluster label")
    ax.legend()
    # Save the plot as an image file
    plt.savefig("Image/silhouette_plot.png")


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
