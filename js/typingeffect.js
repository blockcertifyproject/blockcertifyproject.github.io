
var i = 0;
var txt = document.getElementById('TypingEffectText').innerHTML;
document.getElementById('TypingEffectText').innerHTML = '';

function typeWriter() {
    var speed = 120;
    if (i < txt.length) {
        document.getElementById("TypingEffectText").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}
