function attachEvents() {

    const url = `http://localhost:3030/jsonstore/phonebook`;
    //get dom elements
    const phonebookList = document.getElementById('phonebook');
    const loadBtn = document.getElementById('btnLoad');
    
    const createBtn = document.getElementById('btnCreate');

    //get
    loadBtn.addEventListener('click', onClickLoad);

    async function onClickLoad(){
        phonebookList.innerHTML = '';

        let response = await fetch(url);
        let data = await response.json();
        
        Object.values(data).forEach(d => {
            const {person, phone, _id} = d;

            const li = createElement('li',`${person}: ${phone}`, phonebookList);
            li.setAttribute('id', _id);

            const deleteBtn = createElement('button', 'Delete', li);
            deleteBtn.setAttribute('id', 'btnDelete');
            deleteBtn.addEventListener('click', onClickDelete);
        })
    }
    //post
    createBtn.addEventListener('click', onClickCreate);
    async function onClickCreate(){
        const personInp = document.getElementById('person');
        const phoneInp = document.getElementById('phone');

        let data = {
            person: personInp.value,
            phone: phoneInp.value,
        };

        if(personInp.value !== '' && phoneInp.value !== ''){

            const postRequest = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            loadBtn.click();
            personInp.value = '';
            phoneInp.value = '';
            
        } else{
            return alert('All fields are required!')
        }
        
    }

    //delete
    async  function onClickDelete(ev){
        const id = ev.target.parentNode.id;
        ev.target.parentNode.remove();

        const deleteUrl = `${url}/${id}`;
        const deleteRequest = await fetch(deleteUrl, {
            method: 'DELETE',
        });
    }

    function createElement(type, content, parent){
        const result = document.createElement(type);
        result.textContent = content;
        parent.appendChild(result);

        return result;
    }
}

attachEvents();