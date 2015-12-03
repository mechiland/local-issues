var states = [
	"Unplanned", "Need Analysis", "In Analysis", "Waiting for Design",
	"In Design", "Ready for Dev", "In Dev", "Dev Done",
	"Testing", "Test Done", "Online", "Closed"
]

function github() {
	var githubToken = $("#github-token").val()

	var github = new Github({
	  token: githubToken,
	  auth: "oauth"
	});
	
	return github;
}

function loadMilestones() {

	var milestones = github().getMilestones("thscn", "goldendata");
	template = _.template($("#milestone-template").html())
	milestones.list({}, function(err, list) {
		_.each(list, function(m) {
			$("#milestones").append(template(m))
		})
	});
}

function loadIssuesForMileStone(milestone) {

	var issues = github().getIssues("thscn", "goldendata");
	template = _.template($("#card-template").html())
	issues.list({"milestone": milestone }, function(err, list) {
		$("#state-0").empty();
		_.each(list, function(i) {
			$("#state-0").append(template(i))
		})
		
	})

}


$(document).ready(function() {
	
	
	
	
	var index = 0;
	names = _.map(states, function(s){ return {"name" : s, "index": index++} });
	template = _.template($("#state-col-template").html())
	_.each(names, function(s) {
		$("#workflow").append(template(s))
	})	
	
	

	$(document).on("click", ".milestone-link", function(){
		loadIssuesForMileStone($(this).data("milestone-number"));
	})
	
	$(document).on("click", "#fetch-milestone-btn", function() {
		loadMilestones();
	})
	
	
	
})

