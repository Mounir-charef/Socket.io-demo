const socket = io('ws://localhost:8080'),
    list = document.querySelector('ul'),
    input = document.querySelector('input');

socket.on('message', text => {
    const el = document.createElement('li');
    el.innerHTML = text;
    list.appendChild(el);
});

document.querySelector('button').onclick = () => {
    const text = input.value
    input.value = ''
    socket.emit('message', text)
}
