<template>
    <div id="dock">
        <div class="pf_wrap">
            <div id="dummy">
            </div>
            <div id="pficon" class="icon_delay">
                <span>
                    <img src="../assets/pficon2.png" height="160" width="160" title="uchinoko">
                </span>
            </div>
            <div id="line1" class="str_delay">
                <p class="moving-literal">NAME</p>
                <hr />
            </div>
            <div id="line2" class="str_delay">
                <hr />
            </div>
            <div id="nameplate" class="str_delay">
                <p class="moving-literal"> Yu\w* (beta)</p>
            </div>
            <div id="line3" class="str_delay">
                <p class="moving-literal">INTEREST</p>
                <hr />
            </div>
            <div id="line4" class="str_delay">
                <hr />
            </div>
            <div id="interest" class="str_delay">
                <p class="moving-literal">Video Game</p>
                <p class="moving-literal">Programming</p>
                <p class="moving-literal">Illust</p>
                <p class="moving-literal">Sound</p>
                <p></p>
            </div>
        </div>
    </div>
</template>

<script>
import { setInterval, setTimeout } from 'timers';
export default {
    
}
// for low width
// window.onload = () => {
//     if (window.innerWidth < 700) {
//         document.getElementById("dock").style.width = window.innerWidth + "px";
//     }
//     // console.log("width changed.");
// }

var movingLiteral = {
    run: function()
    {
        this.literals = document.getElementsByClassName("moving-literal");
    
        var list = [];
        for(var p of this.literals)
        {
            list = list.concat(p.innerText);
        }
        this.origLiterals = list;

        document.addEventListener("mouseenter", () => {
            this.outsideMouse = false;
            var i = 0;
            for(var p of this.literals)
            {
                p.innerText = this.origLiterals[i];
                i++;
            }
            //console.log("mouseenter", this.origLiterals);
        });
        document.addEventListener("mouseleave", () => {
            setTimeout(() => {
                this.outsideMouse = true;
            }, 30000);
        });

        this.outsideMouse = false;
        this.changeStart();
    },

    changeStart: function() 
    {
        setInterval(() => {
            if(this.outsideMouse)
            {
                for(var p of this.literals)
                {
                    if(this.slotChoose() === 1)
                    {
                        var index = this.lineChoose(p.innerText.length);
                        
                        p.innerText = p.innerText.replace(p.innerText[index], this.replaceLiteral());
                        //console.log("changeText", p);
                    }
                }
            }
        }, 100);
    },

    slotChoose: function() 
    {
        return Math.round(Math.random() * 3);
    },

    lineChoose: function(length)
    {
        return Math.floor(Math.random() * length);
    },

    replaceLiteral: function()
    {
        // 利用 unicode 範囲
        // \u0021 - \u007E
        // \u00A1 - \u02AF
        for(;;)
        {
            var code = Math.floor(Math.random() * 0x2AF);
            if(code >= 0x21 && code <= 0x7E || code >= 0xA1)
            {
                break;
            }
        }
        
        if(code.length < 2)
        {
            code = "000" + code;
        }
        else if (code.length < 3)
        {
            code = "00" + code;
        }
        else if (code.length < 4)
        {
            code = "0" + code;
        }

        return String.fromCharCode(code);
    }
}

setTimeout(() => {
    movingLiteral.run(); 
}, 1000);




</script>

<style>
@import '../variables.css';
@import '../css/pf-grid.css';
</style>
