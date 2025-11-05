// simulate sorting search results (!)
$('.site-dropdown-options').on('click', function () {
  const sortCont = $('.search-sort-container')[0]
  let thisSort = this.dataset.sort
  switch (thisSort) {
		case 'surname':
      sortCont.dataset.sortType = thisSort
      sortCont.style.flexDirection = 'column'
			break
		case 'name':
      sortCont.dataset.sortType = thisSort
      sortCont.style.flexDirection = 'column-reverse'
			break
		case 'patronymic':
      sortCont.dataset.sortType = thisSort
      sortCont.style.flexDirection = 'column'
			break
    case 'date':
      sortCont.dataset.sortType = thisSort
      sortCont.style.flexDirection = 'column-reverse'
      break
	}
})