var employeeList = [];

function Employee(empFName, empLName, empID, jobTitle, empSalary){
    this.empFName = empFName;
    this.empLName = empLName;
    this.empID = empID;
    this.jobTitle = jobTitle;
    this.empSalary = empSalary;

    employeeList.push(this);
}

function calcMonthlyCosts(employeeList){
// store total of all salaries
    var total = 0;
    // add each salary to total
    for (var i = 0; i < employeeList.length; i++){
        total += employeeList[i].empSalary;
    }

    return Math.round(total / 12);
}

// document ready
$(document).ready(onReady);

// on ready
function onReady(){
    // listeners
    // when Submit button is clicked
    $('#submitEmployee').on('click', onSubmit);
    // when Remove employee button is clicked
    $('main').on('click', '#removeEmployee', onRemove);

    // Submit new employee
    function onSubmit(){
        for (var i = 0; i < employeeList.length; i++){
            if ($('#empID').val() == employeeList[i].empID){
                alert('That employee ID is already in use.');
                return false;
            }
        }

        // create new employee based on user inputs
        new Employee(
            $('#empFName').val(),
            $('#empLName').val(),
            $('#empID').val(),
            $('#jobTitle').val(),
            parseInt($('#empSalary').val())
        )
        
        // modify header for submittal section
        $('h4').text('Submit another employee?');
        
        // calculate monthly costs and display on DOM
        if ($('#submitEmployee').data('submitted') === 0){
            $('main').append('<p>Total monthly costs: $' + calcMonthlyCosts(employeeList) + '</p>');
        }else{
            $('p').text('Total monthly costs: $' + calcMonthlyCosts(employeeList));
        }

        // display employee information on DOM
        if ($('#submitEmployee').data('submitted') === 0){
            $('main').append($('<ul>'));
        }

        $empData = $('<li id="' + $('#empID').val() + '">').html($('#empLName').val() + ', ' + $('#empFName').val() + ' ID: ' + $('#empID').val() + ' Title: ' + $('#jobTitle').val() + ' Salary: ' + parseInt($('#empSalary').val()) + '<br>');
        $('ul').append($empData);

        if ($('#submitEmployee').data('submitted') === 0){
            // add employee selector to DOM
            var $removeHeading = $('<h4>').text('Would you like to remove an employee?').attr('id', 'removeHeading');
            var $removeList = $('<select>').attr('id', 'findEmployee');
            var $removeButton = $('<button>Remove employee</button>').attr('id', 'removeEmployee');
            $('main').append($removeHeading);
            $('main').append($removeList);
            $('main').append($removeButton);
        }

        // add new item to employee selector with employee's name, and stored data
        // containing employee ID.
        var $newEmployeeSelector = $('<option>').attr('id', $('#empID').val())
            .text($('#empLName').val() + ', ' + $('#empFName').val());
        $('#findEmployee').append($newEmployeeSelector);

        // indicator that an employee's information has been submitted
        $('#submitEmployee').data('submitted', 1);

        // reset employee information forms
        $('#empFName').val('');
        $('#empLName').val('');
        $('#empID').val('');
        $('#jobTitle').val('');
        $('#empSalary').val('');
    }

    function onRemove(){
        // remove employee from employee array and from remove list
        for (var i = 0; i < employeeList.length; i++){
            if ($(':selected').attr('id') == employeeList[i].empID){
                // remove employee from global array
                employeeList.splice(i, 1);
                // remove employee info from DOM
                $('li#' + $(':selected').attr('id')).remove();
                // remove employee name from dropdown menu
                $(':selected').remove();
            }
        }
        
        // if all employees are deleted
        if (employeeList.length === 0){
            // make page look as it did before first employee was added
            $('p').remove();
            $('#removeHeading').remove();
            $('select').remove();
            $('#removeEmployee').remove();
            // reset indicator to show no employees have been submitted
            $('#submitEmployee').data('submitted', 0);
            $('h4').text('Please submit employee information');
            // remove list
            $('ul').remove();
        }else{
            // otherwise calculate and display monthly costs
            $('p').text('Total monthly costs: $' + calcMonthlyCosts(employeeList));
        }

    }

}