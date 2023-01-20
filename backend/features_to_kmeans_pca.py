from sklearn.cluster import KMeans
import numpy as np
# import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
import json
import random 

def featuresToKmeansPCA(json_path, n_images, n_clusters):
    # Json data path (json: {"filenames" : [] , "features" : []} )
    # json_path = "features/features_color.json"
    # json_path = "features/features_InceptionV3.json"
    # json_path = "features/features_ResNet50.json"

    indexes = random.sample(range(0, 2856), n_images)
    indexes.sort()

    # Upload file
    data = json.load(open(json_path))

    filenames = data["filenames"]
    X = data["features"]

    filenames = np.array(filenames)[np.array(indexes)]
    filenames = filenames.tolist() ##########################

    X =  np.array(X)[np.array(indexes)]
    X = X.tolist()

    # Create a KMeans object and fit the data
    kmeans = KMeans(n_clusters=n_clusters, random_state=0).fit(X)

    # Get the cluster assignments for each data point
    clusters = kmeans.predict(X)

    cluster_centers = list(zip(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1])) 

    # Perform PCA on the features
    pca = PCA(n_components=5)
    principal_components = pca.fit_transform(X)

    # x and y-axes correspond to the first two principal components.
    # x_coord = principal_components[:, 0]
    # y_coord = principal_components[:, 1]

    coordinates = list(zip(principal_components[:, 0], principal_components[:, 1])) ##########################

    cluster_centers = pca.transform(kmeans.cluster_centers_) 
    cluster_centers_list = [np_array.tolist() for np_array in cluster_centers] ##########################

    # # Plot the clusters using PCA
    # plt.scatter(principal_components[:, 0], principal_components[:, 1], c=clusters)
    # plt.scatter(cluster_centers[:, 0], cluster_centers[:, 1], color="red")
    # plt.show()

    clusters_list = clusters.tolist() ##########################

    output = {"filenames" : filenames,
            "coordinates" : coordinates,
            "cluster_assignments" : clusters_list,
            "cluster_centers" : cluster_centers_list
            }
    json_string = json.dumps(output)
    
    return json_string