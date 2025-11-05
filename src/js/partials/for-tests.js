
// delete this code (start code)
// setInterval(function () {
function dataTitlePos() {
$('[data-title]').each(function() {
    let thisElPos = this.getBoundingClientRect(),
      thisElRightPos = window.innerWidth - thisElPos.right
    if (thisElPos.x < 100) {
      this.classList.remove('right')
      this.classList.add('left')
    } else {
      this.classList.remove('left')
    }
    if (thisElRightPos < 100) {
      this.classList.remove('left')
      this.classList.add('right')
    } else {
      this.classList.remove('right')
    }
  })
}
dataTitlePos()

// Update tooltip position (!)
$(window).on('click', function(){
  setTimeout(() => { dataTitlePos() }, 500);
})

$('.btn-lock').on('click',function(e){
  e.preventDefault() // because we are inside the link
})
// (!important a > button)
$('a:not(.fancybox) button').on('click', function (e) {
  e.preventDefault() // because we are inside the link
})
$('[data-favorite]').on('click', function (e) {
  if ($(this)[0].getAttribute('data-favorite') === 'remove-from-favorite') {
    this.setAttribute('data-favorite', 'add-to-favorite')
    this.setAttribute('data-title', 'Додати в Обрані Меморіали')
  } else {
    this.setAttribute('data-favorite', 'remove-from-favorite')
    this.setAttribute('data-title', 'Видалити з Обраного')
  }
})


$('a.btn-circle').blur() // del m.b.
$('a.btn-circle').on('click', function (e) {
  e.preventDefault()
  let n = parseFloat(window.getComputedStyle(this).transitionDuration) * 1000;
  setTimeout(() => { window.location = this.href }, n);
})