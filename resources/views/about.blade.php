@extends('layouts.template')

@section('content')
<div class="ui container" style="margin:70px 0">
    <div class="ui stackable grid">
        <div class="ten wide column">
            <div class="ui two cards">
                <div class="ui fluid card">
                    <a target="_blank" rel="noopener noreferrer" class="image" href="https://www.instagram.com/aprijplt/">
                        <img src="" id="apri">
                    </a>
                    <div class="content">
                        <a class="header" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/aprijplt/">Apri</a>
                        <div class="meta">
                            <a>Developer, Team Leader</a>
                        </div>
                    </div>
                </div>
                <div class="ui fluid card">
                    <a target="_blank" rel="noopener noreferrer" class="image" href="https://www.instagram.com/joelmatondangg/">
                        <img src="" id="joel">
                    </a>
                    <div class="content">
                        <a target="_blank" rel="noopener noreferrer" class="header" href="https://www.instagram.com/joelmatondangg/">Joel</a>
                        <div class="meta">
                            <a>Developer</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="six wide column">
            <div class="hiddenGSAP">
                <div class="content" id="img_code">
                    <img src="{{ asset('./assets/images/code_people_hero.svg') }}" x="0" y="0" width="100%" height="100%">
                </div>
            </div>
            <div class="ui hidden divider"></div>
            <a class="ui primary fluid button" href="" target="_blank" rel="noopener noreferrer"><i class="coffee icon"></i>Bergabung</a>
        </div>
    </div>
    <div class="ui stackable grid">
        <div class="column">
            <h1>Misi</h1>
            <p>Halo</p>
        </div>
    </div>
</div>
@endsection

@push('any_js')
<script>
    $(document).ready(() => {
        function getPhoto(username, idImg) {
            // validation for instagram usernames
            var regex = new RegExp(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/);
            var validation = regex.test(username);
            if (validation) {
                $.get("https://www.instagram.com/" + username + "/?__a=1")
                    .done(function(data) {
                        // getting the url
                        var photoURL = data["graphql"]["user"]["profile_pic_url_hd"];
                        // update img element
                        $(idImg).attr("src", photoURL)
                    }).fail(function() {
                        // code for 404 error 
                        console.log('Username was not found!')
                    })
            } else {
                alert('The username is invalid!')
            }
        }
        getPhoto('aprijplt', '#apri');
        getPhoto('joelmatondangg', '#joel');
        
        animateFadeIn('#img_code');
        
    });
</script>

<!-- library animation -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.0/gsap.min.js"></script>
@endpush