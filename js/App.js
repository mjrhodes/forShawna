class App extends React.Component {
	constructor(props) {
		super(props);

		this.handleAddEmployee = this.handleAddEmployee.bind(this);
		this.handleRemoveEmployee = this.handleRemoveEmployee.bind(this);
	}
	
	handleAddEmployee(e) {
    let name = prompt("Employee's name?: ", "Unnamed");
    Scheduler.selectedIndex = Scheduler.employees.length;
    Scheduler.employees.push(new Employee(name));
    document.getElementById("dropdown").innerHTML = name;
    Scheduler.loadEmployeeSchedule();
    this.setState({});
  }

  handleRemoveEmployee(e) {
    Scheduler.employees.splice(Scheduler.selectedIndex,1);
    if (Scheduler.employees.length > 0) {
      Scheduler.selectedIndex = 0;
      document.getElementById("dropdown").innerHTML = Scheduler.employees[0].name;
      Scheduler.loadEmployeeSchedule();
    } else {
      Scheduler.selectedIndex = -1;
      document.getElementById("dropdown").innerHTML = "";
      Button.pressClear(e);
    }
    this.setState({});
  }

  handleDropMenuClick(e) {
    document.getElementById("dropdown").innerHTML = e.target.getAttribute("name");
    Scheduler.selectedIndex = e.target.getAttribute("index");
    Scheduler.loadEmployeeSchedule();
  }

  handleClickButton(e) {
    if (e.target.getAttribute("class") === "enabled") {
      switch (e.target.getAttribute("name")) {
        case "Work Schedule":
          Button.pressWorkSchedule(e);
          break;
        case "Employee Schedules":
          Button.pressEmployeeSchedules(e);
          break;
        case "Set Unavailable":
          Button.pressSetUnavailable(e);
          break;
        case "Set Scheduled":
          Button.pressSetScheduled(e);
          break;
        case "Set Disabled":
          Button.pressSetDisabled(e);
          break;
        case "Clear Schedule":
          Button.pressClear(e);
          break;
        default:
          break;
      }
    }
  }

  render() {
	let e = React.createElement;
    let employees = Scheduler.employees.map((employee, i) =>
        e("li", {key:"employee_"+i, index:i, onClick:this.handleDropMenuClick},employee.name);

    return (
      e("div", {className:"App"}, 
		e("header", {className:"App-header"},
			e("h1", null, "Scheduler");
		),
		e("div", {className:"App-body"},
			e("div", {id:"topPanel", className:"top-panel"}, 
				e("div", {className:"dropdown"}, 
					e("h2", null, "Schedule for:"),
					e("button", {id:"dropdown", className:"dropbtn"}),
					e("img", {src:"./dropDownArrow.png", alt:""}),
					e("div", {className:"dropdown-content"},
						e("ul", {id:"dropmenu"}
					)
				)
			)
		)
	  )
    );
  }
}