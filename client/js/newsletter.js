var input = document.querySelector('.newsletter__input')

function onFocus(){
	this.parentElement.classList.add('is-active')
}

function outFocus(){
	this.parentElement.classList.remove('is-active')
}

input.addEventListener('focus', onFocus)
input.addEventListener('blur', outFocus)