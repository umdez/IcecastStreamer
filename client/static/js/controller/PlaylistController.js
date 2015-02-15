app.controller('PlaylistController', ['$scope', '$modal', 'PlaylistProvider', 'ngToast',  function($scope, $modal, PlaylistProvider, ngToast) {
	$scope.playlists = PlaylistProvider.query();
	$scope.new = true;

	$scope.attrs = {
		update: function(e, ui) {
			$scope.new = false;
		}
	};

	$scope.save = function(playlist) {
		var newOrder = [];
		for (var i = 0; i < playlist.files.length; i++) {
			var e = playlist.files[i];
			newOrder.push(e.id);
		}

		PlaylistProvider.update({id: playlist.id}, newOrder);
		$scope.new = true;
		console.log(newOrder);
	};

	$scope.add = function(playlist, mode) {
		PlaylistProvider.queue({id: playlist.id, mode: parseInt(mode)}).$promise.then(function(response){
			ngToast.create('Playlist added to queue');
		}, function(error) {
			ngToast.create({
				content: error.data.message,
				className: 'danger'
			});
		});
	};
}]);
