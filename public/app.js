class BookApp extends React.Component {
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
        console.log(input)
        this.setState({ books: [...this.state.books, {title: input} ] })
    }
    render() {
        return (
            <div>
                <h1>Book List</h1>
                <AddBookItem onAddItem={this.handleAddItem.bind(this)}/>
                
                {this.state.books.map((book,index) => {
                    return <BookItem key={index} 
                                     title={book.title} 
                                     index={index}
                                     onDeleteItem={()=>{this.handleDeleteItem(index)}}
                                     onSaveItem={this.handleSaveEdit.bind(this)}
                                     />
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
    handleEditClick() {
        this.setState({ isEditing: true })
    }
    handleCancelEdit() {
        this.setState({ isEditing: false })
    }
    handleDelItem(index) {
        this.props.onDeleteItem(index)
    }
    handleSaveItem(input, index) {
        this.props.onSaveItem(input, this.props.index);
        this.setState({ isEditing: false })
    }
    render() {
        return (
            (!this.state.isEditing) ? 
                <ReadBookItem title={this.props.title} 
                              onEditChange={() => this.handleEditClick()}
                              onDelItem={() => this.handleDelItem(this.props.index)}/> :
                <EditBookItem title={this.props.title} 
                              onCancelEdit={() => this.handleCancelEdit()}
                              onSaveItem={this.handleSaveItem.bind(this)}
                              />
        )
    }
}
class ReadBookItem extends React.Component {
    handleEditClick() {
        this.props.onEditChange();
    }
    handleDelItem(index) {
        this.props.onDelItem(index)
    }
    render() {
        return (
            <div>
                <h2>{this.props.title}</h2>
                <button onClick={()=>this.handleEditClick()}>edit</button>
                <button onClick={()=> this.handleDelItem(this.props.index)}>delete</button>
            </div>            
        )
    }
}
class EditBookItem extends React.Component {
    handleCancelEdit() {
        this.props.onCancelEdit();
    }
    handleSaveItem(input, index) {
        this.props.onSaveItem(this.userInput.value, this.props.index)
    }
    render() {
        return (
            <div> 
                <input defaultValue={this.props.title} ref={(input) => this.userInput = input}/>
                <button onClick={this.handleSaveItem.bind(this)}>save</button>
                <button onClick={()=>this.handleCancelEdit()}>cancel</button>
            </div>            
        )
    }
}
class AddBookItem extends React.Component {
    addBook(input) {
        this.props.onAddItem(this.userInput.value)
    }
    render() {
        return (
            <div>
                <input ref={(input) => this.userInput = input} />
                <button onClick={this.addBook.bind(this)}>+</button>
            </div>
        )
    }
}
ReactDOM.render(
    <BookApp />,
    document.getElementById("root")  
)