let scriptURL = 'https://script.google.com/macros/s/AKfycbysmyKQNHxNiybaZ4wum4kkIhmKfWlRrq74KJdD0KSGJIF8ERfKrT1OA_QnHBR58A/exec';
let jsonURL = 'https://api.ipregistry.co?key=9jkdkv7h8nha2wa2';


$(document).ready(function () {
    const isNew = localStorage.getItem("has-visited") == null;
    if (isNew) {
        visitorPost();
        console.log("You are a new user.");
        localStorage.setItem("has-visited", "true");
    } else {
        console.log("You have visited before.");
    }

    postFormData();
});


// Post Contact Form data.

function postFormData() {
    $('#contact_form').on('submit', function (e) {
        e.preventDefault();
        $(".btn-send").attr('disabled', 'disabled');
        $(".btn-send").attr('value', 'Sending...');
        $.ajax({
            crossDomain: true,
            url: scriptURL,
            data: $(this).serialize(),
            method: "POST",
            dataType: 'json',
            success: function (response) {
                $(".btn-send").removeAttr('disabled', 'disabled');
                if (response.error) {
                    $(".btn-send").attr('value', 'Send again');
                    $('.messages').html("Something went wrong, Plaese try again later.");
                } else {
                    $('#contact_form').trigger('reset');
                    $(".btn-send").attr('value', 'Thank you');
                    $('.messages').html("Message send successfully.");
                    setTimeout(() =>
                        window.location.reload(), 5000
                    );
                }
            }
        });

    });
}

// Get users IP deatails.

function visitorPost() {
    $.getJSON(jsonURL, function (data) {
        var dataIp = JSON.stringify(data, null, 2);
        var userData = JSON.parse(dataIp);
        // console.log(userData.location.country.languages[0].name);
        $.ajax({
            crossDomain: true,
            url: scriptURL,
            data: {
                "ip": userData.ip,
                "isp": userData.connection.organization,
                "timezone": userData.time_zone.id,
                "current_time": userData.time_zone.current_time,
                "city": userData.location.city,
                "country": userData.location.country.name,
                "language": userData.location.country.languages[0].name,
                "zip": userData.location.postal,
                "regionName": userData.location.region.name,
                "lat": userData.location.latitude,
                "lon": userData.location.longitude,
                "agent": userData.user_agent.header,
                "action": "visitor"
            },
            method: "POST",
            dataType: 'json',
            success: function (data) {
                console.log("Thanks for visit my webpage.");
                // console.log(userData);
            }
        });
    });
}

/*
function submitUserForm(info) {
    // var response = grecaptcha.getResponse();
    // if (response.length == 0) {
    //     document.querySelector('.messages').innerHTML = 'reCaptcha is required.';
    //     return false;
    // }
    if (info.name.value == "" ||
        info.email.value == "" ||
        info.subject.value == "" ||
        info.message.value == "") {
        document.querySelector(".messages").innerHTML = "All fields are required";
        return false;
    } else {
        postFormData();
    }

    return true;
}

function verifyCaptcha() {
    const form = document.forms['submit-to-google-sheet']
    form.addEventListener('submit', e => {
        e.preventDefault();
        document.querySelector(".btn-send").disabled = true;
        fetch(scriptURL, {
            method: 'POST',
            body: new FormData(form)
        })
            .then(response => {
                if (response['status'] == 200) {
                    document.querySelector(".messages").innerHTML = "Message send successfully.";
                    document.querySelector("#contact_form").reset();
                    // grecaptcha.reset();
                    document.querySelector(".btn-send").disabled = false;

                    // document.querySelector(".btn-send").setAttribute("value", "Send successfully");
                    setTimeout(() =>
                        window.location.reload(), 3000
                    );
                } else {
                    document.querySelector(".messages").innerHTML = "Something went wrong, Plaese try again later."
                }

            })
            .catch(error =>
                document.querySelector(".messages").innerHTML = "Something went wrong, Plaese try again later."
            )

    });
    // console.log(new FormData(form))
}
*/