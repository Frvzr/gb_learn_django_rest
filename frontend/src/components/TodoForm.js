import React from 'react'


class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: '', project: props.project[0]?.id, writer: props.writer[0]?.id }
    }
    handleChange(event) {
        this.setState(
            {
                [event.target.text]: event.target.value
            }
        );
    }
    handleSubmit(event) {
        console.log(this.state.text)
        console.log(this.state.project)
        console.log(this.state.writer)
        this.props.createToDo(this.state.text, this.state.project, this.state.writer)
        event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="login">name</label>
                    <input type="text" className="form-control" name="text"
                        value={this.state.text} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="project">Project</label>
                    <select className="form-control" name="project" onChange={(event) => this.handleChange(event)}>{this.props.projects.map((item) => <option value={item.id}>{item.name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label for="writer">Writer</label>
                    <input type="number" className="form-control" name="writer"
                        value={this.state.writer} onChange={(event) => this.handleChange(event)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form >
        );
    }
}
export default TodoForm
