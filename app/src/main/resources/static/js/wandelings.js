'use strict';

var api = 'api/wandelings';
var wandelingsDataTable;

$(document).ready(function() {

	let columns = [
		{ 'title': 'Name', 'data': 'name' },
		{ 'title': 'Start', 'data': 'start' },
		{ 'title': 'Finish', 'data': 'finish' },
		{ 'title': 'Review', 'data': 'review' },
	]

	wandelingsDataTable = $('#wandelingsDataTable').DataTable({
		'order': [[0, 'asc']],
		'columns': columns
	}); 

	$('#wandelingsDataTable tbody').on('click', 'tr', function () {
		let wandelingData = wandelingsDataTable.row(this).data();
		edit(wandelingData.id);
	});

	getAll();
	$('#addBtn').click(create);
	$('#saveBtn').click(insert);
	$('#deleteBtn').click(deleteItem);

	$('#form').on('shown.bs.modal', function () {
		$('.modal-body :input:visible:first').focus();
	})
})

function clearForm() {
	$('input').each(function() {
		$(this).val('');
	});
	$('input:checkbox').each(function() {
		$(this).prop('checked', false);
	});
}

function getAll() {
	$.get(api, function(wandelings) {
		if (wandelings) {
			wandelingsDataTable.clear();
			wandelingsDataTable.rows.add(wandelings);
			wandelingsDataTable.columns.adjust().draw();
		}
	});
}

function create() {
	// Set title
	$('#modal_create_edit_title').text('New Wandeling');

	$('#saveBtn').off('click');
	$('#saveBtn').click(insert);

	// Hide delete button
	$('#deleteBtn').hide();

	// Fill relationships selects for in the UI

	// Clear form
	clearForm();

	$('#form').modal({backdrop: 'static'}); // backdrop:static => to prevent closing the modal when clicking outside of it
}

function insert(e) {
	e.preventDefault();

	// Create obj
	let obj = {
		name: $('#name').val(), 
		start: $('#start').val(), 
		finish: $('#finish').val(), 
		review: $('#review').val(), 
	}

	console.log(obj);

	send(api, obj, 'POST');
}
function edit(id) {

	// Set title
	$('#modal_create_edit_title').text('Edit Wandeling');

	// Show delete button
	$('#deleteBtn').show();

	// Clear form
	clearForm();

	// Get item
	$.get(api+'/'+id, function(wandeling) {
		if (wandeling){
			// Fill form
			$('#id').val(wandeling.id);
			$('#name').val(wandeling.name);
			$('#start').val(wandeling.start);
			$('#finish').val(wandeling.finish);
			$('#review').val(wandeling.review);

			$('#saveBtn').off('click');
			$('#saveBtn').click(update);

			$('#form').modal({backdrop: 'static'}); // backdrop:static => to prevent closing the modal when clicking outside of it
		}
	});
}

function update(e) {
	e.preventDefault();

	let id = +$('#id').val();
	console.log('updating ...'+id);

	// Create obj
	let obj = {
		name: $('#name').val(), 
		start: $('#start').val(), 
		finish: $('#finish').val(), 
		review: $('#review').val(), 
	}

	console.log(obj);

	send(api+'/'+id, obj, 'PUT');
}

function deleteItem() {

	let id = +$('#id').val();
	let uri =  `${api}/${id}`;

	// Send data
	$.ajax({
		url: uri,
		type: 'DELETE'
	 }).then(function() {
		 $('#form').modal('toggle');
		getAll();
	});
}

function send(url, obj, method) {
	// Send data
	$.ajax({
		url: url,
		type: method,
		data: JSON.stringify(obj),
		contentType: 'application/json; charset=utf-8'
	}).then(function() {
		$('#form').modal('toggle');
		getAll();
	});
}
