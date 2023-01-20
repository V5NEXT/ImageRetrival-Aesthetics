from extract_features_image import *
from features_to_kmeans_pca import *

test_image_path = "dataset_test/test.jpg"
new_json = extract_features_image('VGG16', test_image_path)

output = featuresToKmeansPCA("features/features_VGG16.json", 300, 4, new_json)
    
plotPCA(output)