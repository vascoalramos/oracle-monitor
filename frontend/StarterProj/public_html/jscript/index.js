/* global fetch */

// documentação https://alexwohlbruck.github.io/cat-facts/docs/
function getTest() {
    fetch('https://cat-fact.herokuapp.com/facts' ,{
        method: 'get',
        headers : {
            mode : 'no-cors'
        }
    })
        .then(res => res.json())
        .then((data) => {
            let output = '';
            let count = 0 ;

            data["all"].forEach(function (cats) {
                count ++;
                output += `
              <li class="list-group-item">
                    <!-- Custom content-->
                    <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                        <div class="media-body order-2 order-lg-1">
                          <h5 class="mt-0 font-weight-bold mb-2" id="facts_`+count + `">Facts: ${cats["text"]}</h5>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item" id="type_`+count + `">Type: ${cats.type} </li>
                                <li class="list-group-item" id="upvotes_`+count + `">Upvotes: ${cats.upvotes} </li>
                           
                            </ul>
                        </div>
                    </div>
                    <!-- End -->
                </li>
                         `;

            });
            document.getElementById('output').innerHTML = output;
            //console.log(JSON.stringify(data));
        })
        .catch((error) => {
            console.log(error);
        });
}
