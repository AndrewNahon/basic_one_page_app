$(function() {
  var event_template = Handlebars.compile($("#event").html()),
      events_template = Handlebars.compile($("#events").html());

  Handlebars.registerPartial("event", $("#event").html());

  var Events = {
    collection: [],
    render: function() {
      $("#events_list").html(events_template({events: this.collection}));
    },
    remove: function(id) {
      this.collection = this.collection.filter(function(obj) {
        return obj["id"] !== id;
      });
    },
    sortCollection: function() {
      this.collection.sort(function(a, b) {
        return a.date - b.date;
      })
    }
  }


  $.ajax({
    url: "/events",
    success: function(events) {
      Events.collection = events;
      Events.sort();
      Events.render();
    }
  });

  $("form").on("submit", function(e) {
    e.preventDefault();
    var $f = $(this);
    $.ajax({
      url: "/events/new",
      type: "post",
      data: $f.serialize(),
      success: function(event) {
        Events.collection.push(event);
        Events.sortCollection();
        Events.render();
      } 
    });
  });

  $("#events_list").on("click", "a.remove", function(e) {
    e.preventDefault();
    var id = +$(e.target).closest("li").attr("data-id");
    Events.remove(id);
    Events.render();
    console.log(Events.collection);
  })
});