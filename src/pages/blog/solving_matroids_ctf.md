---
layout: ../../layouts/BlogPostLayout.astro
title: Solving Matroid's Intern CTF
description: A step-by-step breakdown of how I solved the challenge
date: 1/18/23
icon: bi:flag
---
Here's a little breakdown of how I solved the challenge/CTF Matroid hosted for their Software Engineering Intern position. 

*Note: At the time of this post, the initial Base64 data that decoded to link to the project was removed from the job application, but the website still remains hosted.*

### Step 1 - Base64 Decoding
The first step is to have an idea of what you're looking at when applying to the job. On the job application, at the very bottom was a header and sub header inviting the applicant to try to solve the CTF (I honestly can't remember exactly what it said, but it was something like that) and some Base64 data, respectively. With this, I simply copied the data, pasted it here (https://www.base64decode.org/), and decoded it. This decoded to the link where the CTF begins here: https://notepad-24.mtrd.in/.

### Step 2 - Website Analysis
![Website Analysis](/matroidctf/1.png)
**Initial Inspection**
Upon visiting the website you are welcomed by text written in and styled to be the Notepad program from Windows XP. There's some links to Matroid's main site and details about the challenge. The main link pointing to `zone.bind` (as seen above) doesn't actually linking to a real site since and doesn't appear to do anything on clicking.

**Viewing Page Source**
After reading through all this, the web developer in me chose to view page source to see if there was anything interesting possibly hidden from regular HTML rendering. This can be done by right-clicking the page and clicking View Source (in most modern browsers). After inspecting the page source, I discovered 2 interesting things.

![Discovery 1](/matroidctf/2.png)
This first is a script tag linking to a JavaScript file hosted at `/cool.js`. It's also worth looking into style.css (however this didn't lead to anything) since any external files could contain information.

![Discovery 2](/matroidctf/3.png)
The second was a module importing and using a WebAssembly function called `the_ultimate_question_of_life_the_universe_and_everything` then adding an event listener to an element with id `a-link`.
![Link](/matroidctf/4.png)
`a-link` happens to be the `zone.bind` link I mentioned earlier that wasn't doing anything. Strange...

### Step 3 - The Red Herring
Working my way through the 2 discoveries, I first decided to inspect the `/cool.js` script. This is the entire script:

```JavaScript
function nice(e) {
  if (typeof e.preventDefault !== 'function') {
    return
  }
  console.log("This is a nice function")
  console.log("It will guide you to the wrong direction.")
  alert("GOTO /sunflower/zone.bind")
  e.preventDefault()
  e.stopPropagation()
}
```

This tells you that it's the "wrong direction" however just to be sure I started looking into zone.bind which, as explained by GPT-4-1106-preview, is the following
	A BIND zone file is a text file that defines the mappings between domain names and IP addresses for a specific zone within the Domain Name System (DNS). BIND stands for Berkeley Internet Name Domain, which is the most commonly used DNS software on the Internet and is the de facto standard on Unix-like operating systems. The files are used by BIND to resolve domain names to IP addresses and to direct traffic to the appropriate servers for a particular domain.

Using my knowledge from my cybersecurity courses, I decided to run a `dig` command on the domain https://notepad-24.mtrd.in/ and also https://notepad-24.mtrd.in/sunflower to see if anything interesting popped up.

`dig any notepad-24.mtrd.in` resulted in the following:
![Dig 1](/matroidctf/5.png)
`dig any notepad-24.mtrd.in/sunflower` resulted in the following:
![Dig 2](/matroidctf/6.png)
Overall result, no dice. Neither dig resulted in any useful data and the `/sunflower` domain wasn't even a hosted site and was returning 404. This meant that the the `/cool.js` script was ultimately a red herring and just a waste of time. No worries though, just time to move onto the next possible route.
### Step 4 - Web Assembly / Googling
Since I know the link needs to be clicked to call the mysterious function, but that for whatever reason a double click wasn't registering, I chose to forcefully trigger the event using JavaScript. The snippet I used is the following:

```JavaScript
const event = new Event('dblclick');
const element = document.querySelector('#a-link');
element.dispatchEvent(event);
```

Upon execution from console, I received the following prompt:
![Script](/matroidctf/7.png)
At this time, I wasn't aware of the "answer" for this so I just decided to click Ok and see what would happen. Upon submitting the default "?", I received the following alert:
![Prompt](/matroidctf/8.png)
Wrong answer :( But that's okay! Because we have something to work with at least.

From here, there's two main approaches you could potentially take, an easy and a hard way. When I was doing this, I was so focused I didn't even stop to think about the easy way, but I'll explain what I did first.

**Working with WASM**
Upon looking into the `./wasm/pkg/hello_wasm.js`, which is the file linked in on the website providing the `the_ultimate_question_of_life_the_universe_and_everything` function, I learned that it consists of functions to handle the interaction with web assembly, such as memory management, string conversion, and initializing the web assembly instance. It does not contain specific or distinguishing information that could be directly useful for solving the CTF.

However, there was a specific exported function called `the_ultimate_question_of_life_the_universe_and_everything`, which is likely related to the challenge. The function takes an `answer` as a parameter.

```JavaScript
}
/**
* @param {string} answer
*/
export function the_ultimate_question_of_life_the_universe_and_everything(answer) {
    const ptr0 = passStringToWasm0(answer, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.the_ultimate_question_of_life_the_universe_and_everything(ptr0, len0);
}
```

Based on this function, we can determine that the actual challenge or any useful information likely resides within the WebAssembly module referred to in the script by `'hello_wasm_bg.wasm'`. To investigate this further, I decided to analyze the associated web assembly file (again, this is the hard way). Here are the general steps I took to analyze it:

1. **Obtain the wasm file**: This was obviously easy enough, just go to the URL hosting the file. The wasm file could be found by inspecting element, going to sources, and simply looking for a wasm file being used.
![Obtain Wasm](/matroidctf/9.png)

2. **Analyze the wasm code**: I look through the disassembled code for any functions, strings, or data that seems relevant to the CTF challenge. After not finding any clear strings or data that screamed flag at me, I focused in on what happens inside the `the_ultimate_question_of_life_the_universe_and_everything` function.

```WebAssembly
(func $the_ultimate_question_of_life_the_universe_and_everything (;11;) (export "the_ultimate_question_of_life_the_universe_and_everything") (param $var0 i32) (param $var1 i32)
    (local $var2 i32)
    (local $var3 i32)
    (local $var4 i32)
    global.get $global0
    i32.const -64
    i32.add
    local.tee $var2
    global.set $global0
    local.get $var2
    local.get $var1
    i32.store offset=16
    local.get $var2
    local.get $var0
    i32.store offset=12
    block $label2
      block $label1
        block $label0
          local.get $var1
          i32.const 2
          i32.eq
          if
            local.get $var0
            i32.load16_u align=1
            i32.const 12852
            i32.eq
            br_if $label0
          end
          local.get $var2
          i32.const 44
          i32.add
          i64.const 1
          i64.store align=4
          local.get $var2
          i32.const 1
          i32.store offset=36
          local.get $var2
          i32.const 1048592
          i32.store offset=32
          local.get $var2
          i32.const 1
          i32.store offset=60
          local.get $var2
          local.get $var2
          i32.const 56
          i32.add
          i32.store offset=40
          local.get $var2
          local.get $var2
          i32.const 12
          i32.add
          i32.store offset=56
          local.get $var2
          i32.const 20
          i32.add
          local.get $var2
          i32.const 32
          i32.add
          call $func7
          local.get $var2
          i32.load offset=24
          local.get $var2
          i32.load offset=20
          local.tee $var4
          local.get $var2
          i32.load offset=28
          call $wbg.__wbg_alert_8755b7883b6ce0ef
          if
            local.get $var4
            call $func3
          end
          local.get $var1
          br_if $label1
          br $label2
        end $label0
        local.get $var2
        i32.const 44
        i32.add
        i64.const 1
        i64.store align=4
        local.get $var2
        i32.const 2
        i32.store offset=36
        local.get $var2
        i32.const 1048616
        i32.store offset=32
        local.get $var2
        i32.const 1
        i32.store offset=60
        local.get $var2
        local.get $var2
        i32.const 56
        i32.add
        i32.store offset=40
        local.get $var2
        local.get $var2
        i32.const 12
        i32.add
        i32.store offset=56
        local.get $var2
        i32.const 20
        i32.add
        local.get $var2
        i32.const 32
        i32.add
        call $func7
        local.get $var2
        i32.load offset=24
        local.get $var2
        i32.load offset=20
        local.tee $var3
        local.get $var2
        i32.load offset=28
        call $wbg.__wbg_alert_8755b7883b6ce0ef
        i32.eqz
        br_if $label1
        local.get $var3
        call $func3
      end $label1
      local.get $var0
      call $func3
    end $label2
    local.get $var2
    i32.const -64
    i32.sub
    global.set $global0
  )
```

3. **Debug the wasm code**: I started debugging this code by setting breakpoints and executing the JS snippet I used earlier to trigger the function call. After experimenting a little bit (and also getting some help from GPT-4), I came to a few conclusions.

Firstly, this function appears to perform a check and presents an alert (`$wbg.__wbg_alert_8755b7883b6ce0ef`) if the provided input is incorrect. Additionally, the function takes two parameters, both are 32-bit integers (`i32`). These likely represent a pointer to and the length of a string in linear memory. At one point, the function checks if the parameter representing the length of the input string is exactly `2` and then compares the first two bytes of the input (loaded with `i32.load16_u`) against the constant `12852`. With this little piece of information, we have to remember that `12852` is being represented in decimal. It is possible, for example, that `12852` represents the characters of a string when you convert it to hexadecimal and then to ASCII or Unicode characters. In hexadecimal, `12852` would be `0x3234` or `'42'` in ASCII characters. Let's try it!
![Answer](/matroidctf/10.png)
`42` works! This is where the easy way becomes clear. If you happen to be well-read, you may know that this function name (`the_ultimate_question_of_life_the_universe_and_everything`) is a reference to *The Hitchhiker's Guide to the Galaxy* by Douglas Adams. Upon Googling what the answer to this question is, you can easily find the following result:
![Google Result](/matroidctf/11.png)

Oh well...

### Step 5 - Digging
After spending more time than I probably should have on the previous step, I now had new instructions: `Goto /42/zone.bind`. Thankfully, this was not a red herring like `/sunflower/zone.bind` and instead leads to a file download. This file, unsurprisingly, is named `zone.bind`. Upon opening it in my text editor of choice (VS Code), I was greeting with the following block of text.

![Code](/matroidctf/12.png)

This `zone.bind` file is a standard DNS BIND zone file, which is used to configure the DNS settings for the `mtrd.in` domain. There's not too much interesting here, except for line 10 which appears to have something redacted but is related to "short instructions for job application." Knowing I can query the TXT record with `dig` I went ahead and executed the following command: `dig TXT shortcut-42-instruction.notepad-24.mtrd.in`, resulting in the following.
![Dig Result 2](/matroidctf/13.png)
Hooray, another link! Upon visiting this I was greeted with a simple HTML page with the following:
![Result Page 2](/matroidctf/14.png)

### Step 6 - Nix
Of course, I went ahead and downloaded this file. Thing first thing I did was ask GPT-4 what a `.drv` file was, to which I was given this information:
	You have obtained a `.drv` file, which is a Nix derivation. Nix derivations are a core concept of the Nix package manager which is used in NixOS and for cross-platform package management. Derivations specify how to build a package from source, including all of its dependencies and build steps. The `.drv` file you received contains a recipe for building a specific package.

In addition to this, GPT-4 recommended I inspect the `.drv` file in an editor and explained how I should look at inputs, outputs, and build steps. After looking into this, I noticed there's a `buildPhase` containing the following instructions:
```
PHASE=$(cat random | cut -b 135-192)
echo "$PHASE/instruction.md" > ans
```

Based on this, I can deduce that a file named `random` contains some data that can then be piped into another file called `ans`. At this point, I tried to build the Nix package, but after receiving some errors, I got lazy and decided to double-back and re-inspect the `.drv` file, at which point I found the following snippet: `("src","/nix/store/<redacted>-random.tar.gz")`. Seeming like a URL, I appended it to the most recent URL I had used and visited it, leading to a new file, unsurprisingly, called `<redacted>-random.tar.gz` being downloaded. I extracted this and was left with a file called `random` (it's coming together!!!). The file `random` happens to be 10 million seemingly random characters. However, with this file, I'm able to successfully execute the script above, and get the following data in the `ans` file: `<redacted>/instruction.md`. Another URL! Hopefully the last...

### Step 7 - End Game
Upon visiting this URL, I was greeted with the following screen:
![End Game](/matroidctf/15.png)
Awesome! Challenge complete. Of course, I followed the instructions and sent in a little snippet about myself in hopes of hearing back about internship opportunities. Overall, this was a fun challenge. Very similar to the CTF another startup company, Ramp, hosted this past summer for their internship (which I also successfully completed, but didn't do a write-up on theirs and was rejected unfortunately). This was definitely a fun way to spend my afternoon and I do hope to do more challenges like these in the future. I would say that this is a pretty valid way to assess whether a candidate is capable, however, it should be limited or timed as this one was since answer can leak and ruin the fun for everyone else. Hopefully not too many people read this for a while so that the links are dead or Matroid stops accepting emails from this so that I don't feel bad about posting the answers. Thanks for reading!