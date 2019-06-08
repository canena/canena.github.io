// ################################################################################
// http://www.slideshare.net/nzakas/scalable-javascript-application-architecture
// ################################################################################

(function(){

	var BaseLibrary = function(){
		// Handling low level things here
	};

	var Core = function(){

		var moduleData = {}, debug = false;

		var Sandbox = function(applicationCore){

			return {

			};
		};

		function createInstance(moduleId){

			var instance = moduleData[moduleId].creator(new Sandbox(this)), name, method;

			if (!debug){
				// Filtering unwanted properties?
				for (name in instance){

					method = instance[name];

					if (typeof method === 'function'){
						instance[name] = function(name, method){

							return function(){
								try { return method.apply(this, arguments); }
								catch(ex) { /*log(1, name + "(): " + ex.message);*/ }
							};
						}(name, method);
					}
				}
			}
		}

		function register(moduleId, creator){

			moduleData[moduleId] = {
				creator: creator,
				instance: null
			};
		}

		function start(moduleId){

			moduleData[moduleId].creator(new Sandbox(this));
			moduleData[moduleId].instance.init();
		}

		function stop(moduleId){

			var data = moduleData[moduleId];
			if (data.instance){
				data.instance.destroy();
				data.instance = null;
			}
		}

		function startAll(){

			for (var moduleId in moduleData){

				if (moduleData.hasOwnProperty(moduleId)){
					this.start(moduleId);
				}
			}
		}

		function stopAll(){

			for (var moduleId in moduleData){

				if (moduleData.hasOwnProperty(moduleId)){
					this.stop(moduleId);
				}
			}
		}

		return {
			register: register,
			start: start,
			stop: stop,
			startAll: startAll,
			stopAll: stopAll
		};
	};

})();


// Sandbox ajax request
var id = sandbox.request({ name: 'value' }, {
	success: function(response){
		handleSuccess(response.data);
	},
	failure: function(response){
		handleFailure();
	}
});

// New module as follows
Core.register('module-name', function(sandbox){

	function init(){

		// Not sure if I'm allowed
		if (sandbox.iCanHazCheezburger()){

		}
	}

	function destroy(){
		// Destructor
	}

	return {
		init: init, destroy: destroy
	};
});

Core.register('timeline-filter', function(sandbox){

	function changeFilter(filter){

		sandbox.notify({
			type: 'timeline-filter-change',
			data: filter
		});
	}

	return {
		changeFilter: changeFilter
	};
});

Core.register('status-poster', function(sandbox){

	function postStatus(statusText){

		sandbox.notify({
			type: 'timeline-filter-change',
			data: statusText
		});
	}

	return {
		postStatus: postStatus
	};
});

Core.register('timeline', function(sandbox){

	function init(statusText){

		sandbox.listen([
			'timeline-filter-change',
			'post-status'
		], handleNotification, this);
	}

	function handleNotification(note){

		switch(note.type){
			case 'timeline-filter-change':
				this.applyFilter(note.data);
				return;
			case 'post-status':
				this.post(note.data);
				return;
		}
	}

	return {
		init: init, handleNotification: handleNotification
	};
});

Core.register('module1', function(sandbox){ /*...*/ });
Core.register('module2', function(sandbox){ /*...*/ });
Core.register('module3', function(sandbox){ /*...*/ });
Core.register('module4', function(sandbox){ /*...*/ });

Core.startAll();
