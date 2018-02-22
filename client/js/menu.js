var mobileMenu = document.querySelector('.nav__mobile'),
	mobileLink = document.querySelectorAll('.nav__link')

function goToSection(event) {
	event.preventDefault()
	section = this.hash.substr(1)
	window.location.href = '#' + section
	mobileMenu.parentElement.classList.remove('is-active')
}

for(var i = 0; i < mobileLink.length; i++) {
	mobileLink[i].addEventListener('click', goToSection);
}

mobileMenu.addEventListener('click', function(){
	this.parentElement.classList.toggle('is-active')
})
