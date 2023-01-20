from sklearn.cluster import KMeans
import numpy as np
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA

X = np.array(["upload features"])
# Define the number of clusters
n_clusters = 4
# Create a KMeans object and fit the data
kmeans = KMeans(n_clusters=n_clusters, random_state=0).fit(X)
# Get the cluster assignments for each data point
clusters = kmeans.predict(X)


# Plot the data points colored by cluster assignment
plt.scatter(X[:, 0], X[:, 1], c=clusters, cmap='rainbow')
# Plot the cluster centroids
plt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1], marker='x', c='black')
plt.show()

# Perform PCA on the features
pca = PCA(n_components=5)
principal_components = pca.fit_transform(X)
# Plot the clusters using PCA
plt.scatter(principal_components[:, 0], principal_components[:, 1], c=clusters)
plt.show()