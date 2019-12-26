import $ from "jquery";

const urlWidget = "https://test.kewirus.com/api/widgets";

function getAllWidget() {
  var data = [];
  $.ajax({
    method: "GET",
    url: urlWidget,
    async: false,
    success: function(res) {
      data = JSON.parse(JSON.stringify(res));
    },
    error: function(err) {
      alert("error: " + this.status);
      console.log(err);
    }
  });
  return data;
}

function addWidget(request) {
  $.ajax({
    method: "POST",
    url: urlWidget,
    async: false,
    beforeSend: function(req) {
      req.setRequestHeader("Content-Type", "application/json");
    },
    data: JSON.stringify(request),
    success: function(res) {
      alert("Success add widget");
      window.location.reload();
    },
    error: function(err) {
      alert("error: " + JSON.stringify(err));
      console.log(err);
    }
  });
}

function getWidgetDetail(request) {
  var data = [];
  $.ajax({
    method: "GET",
    url: urlWidget + "/" + request,
    async: false,
    success: function(res) {
      data = JSON.parse(JSON.stringify(res));
    },
    error: function(err) {
      alert("error: " + this.status);
      console.log(err);
    }
  });
  return data;
}

function deleteWidget(request) {
  $.ajax({
    method: "DELETE",
    url: urlWidget + "/" + request.toString(),
    async: false,
    beforeSend: function(req) {
      req.setRequestHeader("Content-Type", "application/json");
    },
    success: function(res) {
      alert("Success delete widget");
      window.location.reload();
    },
    error: function(err) {
      alert("error: " + JSON.stringify(err));
      console.log(err);
    }
  });
}

function updateWidget(request) {
  $.ajax({
    method: "PUT",
    url: urlWidget + "/" + request.id.toString(),
    async: false,
    beforeSend: function(req) {
      req.setRequestHeader("Content-Type", "application/json");
    },
    data: JSON.stringify(request),
    success: function(res) {
      alert("Success update widget");
      window.location.reload();
    },
    error: function(err) {
      alert("error: " + JSON.stringify(err));
      console.log(err);
    }
  });
}

function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ".") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
}
export {
  getAllWidget,
  addWidget,
  getWidgetDetail,
  deleteWidget,
  updateWidget,
  formatMoney
};
