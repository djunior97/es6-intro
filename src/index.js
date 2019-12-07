import axios from 'axios';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
class App {
    constructor(){
        this.buttonCreate = document.getElementById("btn_create");
        this.title = document.getElementById("input_title");
        this.content = document.getElementById("input_content");
        
        this.getResults();
        this.registerEvents();

        console.log('constructor');
        
    }
    
    registerEvents() {
        this.buttonCreate.onclick = (event) => this.createCard(event);
    }
    
    async getResults() {
        try {
            let {data} = await axios.get('http://localhost:3030/messages');
            console.log(data);
            
            
            data.forEach(e => {
                let html = this.cardLayout(e.id, e.title, e.content);

                this.insertHtml(html);

                // document.getElementById("row_cards").innerHTML += html;


                this.clearForm();
            })
            
        } catch (error) {
            console.log(error);
        }
        // let result = []; 

        // axios.get('http://localhost:3030/messages')
        // .then(res => {
        //     result = res.data;
        //     console.log('result get', result);
        // })
        // .catch(e => {
        //     console.log(e);
        // })

        // console.log('result fora', result);
        
    }
    
    async createCard(event) {
        event.preventDefault();
        
        if(this.title.value && this.content.value) {
            const title = this.title.value,
            content = this.content.value;
            
            const payload = {
                title,
                content
            }

            let result = await axios.post('http://localhost:3030/messages', payload);
            
            // axios.post('http://localhost:3030/messages', payload)
            // .then(res => {
            //     console.log(res.data);
            // })
            // .catch(e => {
            //     console.log(e);
            // });
            
            this.getResults();
            
            // document.querySelectorAll('.delete-card').forEach(item => {
            //     item.onclick = event => this.deleteCard(event);
            // });
            
        } else {
            alert("Preencha os campos!");
        }
    }
    
    cardLayout(id, title, content) {
        const html = `
        <div class="col mt-5">
        <div class="card">
        <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${content}</p>
        <button type="button" class="btn btn-danger delete-card">Excluir</button>
        </div>
        </div>
        </div>
        `;
        
        return html;
    }
    
    insertHtml(html) {
        document.getElementById("row_cards").innerHTML += html;
    }
    
    clearForm() {
        this.title.value = "";
        this.content.value = "";
    }
    
    deleteCard = (event) => event.path[3].remove();
    
}

new App();