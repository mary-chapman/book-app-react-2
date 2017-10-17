class BookApp extends React.Component {
    render() {
        return (
            <div className="container">
                <h1>Book List</h1>
                <BookListContainer />
            </div>
        )
    }
}
class BookListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [{title: "The Great Gatsby"}, {title: "Oliver Twist"}]
        }
    }
    handleDeleteItem(index) {
        this.setState({ books: this.state.books.filter((_x, i) => i != index) }); 
    }
    handleSaveEdit(input, index) {
        let arrCopy = this.state.books.slice() 
        arrCopy[index].title = input //manipulates state on the copy
        this.setState({books: arrCopy})        
    }
    handleAddItem(input) {
        if (input.value) {
            this.setState({ books: [...this.state.books, {title: input.value} ] })
            input.value = ""
        }
    }
    render() {
        return (
            <div>
                <AddBookItem onAddItem={this.handleAddItem.bind(this)}/>
                
                {this.state.books.map((book,index) => {
                    return <BookItem key={index} title={book.title} index={index}
                                onDeleteItem={()=>{this.handleDeleteItem(index)}}
                                onSaveItem={this.handleSaveEdit.bind(this)} />
                })}
            </div>
        )
    }
}

class BookItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isEditing: false }
    }
    handleSaveItem(input, index) {
        this.props.onSaveItem(input, this.props.index);
        this.setState({ isEditing: false })
    }
    render() {
        return (
            (!this.state.isEditing) ? 
                <ReadBookItem title={this.props.title} index={this.props.index} 
                    onEditChange={() => this.setState({ isEditing: true })}
                    onDelItem={() => this.props.onDeleteItem(this.props.index)} /> :
                
                <EditBookItem title={this.props.title} 
                    onCancelEdit={() => this.setState({ isEditing: false })}
                    onSaveItem={this.handleSaveItem.bind(this)} />
        )
    }
}
class ReadBookItem extends React.Component {
    render() {
        return (
            <div className="listItem">
                <h2>{`${this.props.index + 1}. ${this.props.title}`}</h2>
                <button onClick={()=>this.props.onEditChange()}>edit</button>
                <button onClick={()=> this.props.onDelItem(this.props.index)}>delete</button>
            </div>            
        )
    }
}
class EditBookItem extends React.Component {
    render() {
        return (
            <div className="listItem"> 
                <input defaultValue={this.props.title} ref={(input) => this.userInput = input}/>
                <button onClick={() => this.props.onSaveItem(this.userInput.value, this.props.index)}>
                    save
                </button>
                <button onClick={() => this.props.onCancelEdit()}>
                    cancel
                </button>
            </div>            
        )
    }
}
class AddBookItem extends React.Component {    
    render() {
        return (
            <div className="addForm">
                <input ref={(input) => this.userInput = input} />
                <button onClick={() => this.props.onAddItem(this.userInput) }>+</button>
            </div>
        )
    }
}
ReactDOM.render(
    <BookApp />,
    document.getElementById("root")  
)