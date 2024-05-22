// Enable sorting
//Next, we want to be able to sort the books by title, price, etc. On the home page, there is a dropdown list that we want to populate and activate. The best way is to keep it in the JavaScript model. Thus, we can add more sorting in the future.
//1. In the [index.js](js/index.js) file, create an object to contain keys and labels of the sorting:

   const SORTING = {
      DEFAULT:    "Reset Sorting",
      ALPHA_UP:   "Name A-Z",
      ALPHA_DOWN: "Name Z-A",
      PRICE_UP:   "Price (Low-High)",
      PRICE_DOWN: "Price (High-Low)"
   }

//2. Implement a method to create the model of the dropdown list. We need an array of objects containing `value, selected and label`.

   function createSortingModel(currentSorting) {
     const sorting = []
     for (const [key, value] of Object.entries(SORTING)) {
       const entry = {
         value: key,
         selected: (key === currentSorting) ? "selected" : "",
         label: value,
       }
       sorting.push(entry)
     }
     return sorting
   }

//3. Now, we can populate the `<option>` array of the sorting dropdown in the [index.html](index.html) file.

//It should look like this, now:<br/>
//![sorting-dropdown.png](images/screenshots/sorting-dropdown.png)

//4. Next, we want to implement the JavaScript function that triggers the sorting, once we change the selection in the dropdown list. For that, we pass the dropdown reference and append its value to the URL.

   function triggerSorting(element) {
     const searchParams = new URLSearchParams(location.search)
     searchParams.set('sorting', element.value)
     location.search = searchParams.toString()
   }

   function handleSorting(books, currentSorting) {
     switch (currentSorting) {
       case "DEFAULT":
       case "ALPHA_UP":
         books.sort(function(a, b) {
           return a.title < b.title ? -1 : a.title > b.title ? 1 : 0
         })
         break
       case "ALPHA_DOWN":
         books.sort(function(a, b) {
           return a.title < b.title ? 1 : a.title > b.title ? -1 : 0
         })
         break
       case "PRICE_UP":
         books.sort(function(a, b) { return a.price - b.price })
         break
       case "PRICE_DOWN":
         books.sort(function(a, b) { return b.price - a.price })
      }
      return books
   }