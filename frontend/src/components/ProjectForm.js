import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { name: "", link: "", worker: props.worker[0]?.id }
    }
    handleChange(event) {
        this.setState(
            {
                [event.target.text]: event.target.value
            }
        );
    }
    handleSubmit(event) {
        console.log(this.state.name)
        console.log(this.state.link)
        console.log(this.state.worker)
        this.props.createToDo(this.state.name, this.state.link, this.state.worker)
        event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="login">name</label>
                    <input type="text" className="form-control" name="text"
                        value={this.state.name} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="project">Worker</label>
                    <select className="form-control" name="worker" onChange={(event) => this.handleChange(event)}>{this.props.workers.map((item) => <option value={item.id}>{item.worker}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label for="worker">Link</label>
                    <input type="link" className="form-control" name="link"
                        value={this.state.link} onChange={(event) => this.handleChange(event)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form >
        );
    }
}
export default ProjectForm