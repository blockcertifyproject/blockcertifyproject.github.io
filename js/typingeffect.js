
var i = 0;
var txt = document.getElementById('TypingEffectText').value;
var sp = " ";
document.getElementById('TypingEffectText').value = "";
document.getElementById("TypingEffectText").style.border = "none";
document.getElementById("TypingEffectText").style.outline = "none";
document.getElementById("TypingEffectText").style.textAlign = "center";
document.getElementById("TypingEffectText").style.resize = "none";

//sp.repeat(txt.length);

function typeWriter() {
    var speed = 95;
    if (i < txt.length) {
        document.getElementById("TypingEffectText").value += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}
