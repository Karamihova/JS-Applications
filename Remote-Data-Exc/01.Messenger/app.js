function attachEvents() {
    const textArea = document.getElementById('messages');
    const url = `http://localhost:3030/jsonstore/messenger`; 
    const refreshBtn = document.getElementById('refresh');   
    const sendBtn = document.getElementById('submit'); 
    
    refreshBtn.addEventListener('click', onClickRefresh);
    sendBtn.addEventListener('click', onClickSend);

    async function onClickSend(){
        const authorInp = document.querySelector('input[name=author]');
        const contentInp = document.querySelector('input[name=content]');
        
        let data = {
            author: authorInp.value,
            content: contentInp.value
        };
        
        if(authorInp.value !== '' && contentInp.value !== ''){
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            authorInp.value = '';
            contentInp.value = '';
            refreshBtn.click();

        } else{
            return alert('All fields are required!');
        }
    }

    async function onClickRefresh(){
        let response = await fetch(url);
        let data = await response.json();
        
        textArea.value = Object
        .values(data)
        .map(({author, content}) => `${author}: ${content}`)
        .join('\n');
    }


}

attachEvents();