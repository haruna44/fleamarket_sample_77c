$(function(){
  var search_list = $('.result')
  function builtHTML(item){
    var html =`
              <ul class="result_lists"> 
                <li class="result_lists_list">
                  <a class="result_lists_list_link" href= /items/${item.id}>${item.item_name}</a>
                </li>
              </ul>`
    search_list.append(html);
  }
  
  
  $('.search__input-box__text').on('keyup', function(e){ 
    e.preventDefault();
    var input =  $.trim($(this).val());
    $.ajax({
      type: 'GET',
      url: '/items/search',
      data: { keyword: input},
      dataType: 'json'
    })
    .done(function(items){
      search_list.empty();
      console.log(items)
      if (items.length !== 0) {
        items.forEach(function(item){
          builtHTML(item);
        });
      }else  {
        appendErrMsgToHTML("商品はございません");
      }
    })
    .fail(function() {
      alert('商品検索に失敗しました');
  });
  });
});