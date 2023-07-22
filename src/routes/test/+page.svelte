<script>
	import { paget,cardata } from "$lib/data"
	import { test,cat } from "$lib/store"
    import { onMount } from "svelte";

	var ele,card;
	let i; 
    let count = 0;
// console.log(paget[0].val);
    onMount(()=>{
        for ( i = 0; i < paget.length; i++) {
            if (paget[i].key == $test) {
                ele =  paget[i];
                break;
            }
        }
        for ( i = 0; i < cardata.length; i++) {
            if (cardata[i].key == $test) {
                card =  cardata[i];
                break;
            }
        }
        for (let i = 0; i < ele?.val.length; i++) {
            if (ele.val[i].value != '' && ele.val[i].value <= ele.val[i].high && ele.val[i].value >= ele.val[i].low) {
                count++;
            }
        }
    })

    

    function categ(name){
        let n=name;
        cat.set(n);
        window.location.href="/test/category";
    }  

</script>


<div class="flex z-50 fixed top-0 w-full px-6 py-3 items-center shadow-sm bg-white">
    <a href="/"><i class="fa fa-arrow-left text-xl"></i></a>
    <h1 class="text-lg font-bold m-auto">{ele?.key == undefined ? '' : ele?.key}</h1>
    <div class="circle absolute right-5 flex items-center justify-center border rounded-full w-10 h-10 bg-[#CCC9DC]">
        <i class="fa fa-user text-2xl text-white"></i>
    </div>
</div>

<div class="main w-full bg-[#F6F5FB] pt-24 pb-5">
    <div class="bg-white text-center py-8 mx-5 rounded-lg">
        <h1 class="mt-3 text-xs font-semibold">Health markers</h1>
        {#if count == 0}
            <i class="fa-solid fa-minus text-2xl mt-2" />
            <i class="fa-solid fa-minus text-2xl mt-2" />
        {:else}
            <p class="text-3xl font-bold mt-2">{count}</p>
        {/if}


        <h2 class="text-xs font-semibold">in range</h2>
        <div class="bg-[#E2F2FF] mt-12 mx-7 text-left rounded-lg px-5 py-3">
            <p class="text-sm font-medium">This is where you can track health markers related to each heath zone. Your aim is to have all markers in range</p>
        </div>
    </div>
    <div class="mx-5 mt-5 px-2 py-4 bg-white rounded-lg">
        <h1 class="font-bold ml-3">What's {card?.val.title == undefined ? '' : card?.val.title}?</h1>
        <img class="mt-5 w-p-98 m-auto" src="{card?.val.img}" alt="{card?.val.title == undefined ? '' : card?.val.title} img" />
        <p class="mt-3 ml-2 w-80 font-medium">{card?.val.desc == undefined ? '' : card?.val.desc}</p>
    </div>
    <h1 class="font-bold mt-6 ml-6">Untested health markers</h1>
    <div class="bg-white p-3 mx-5 rounded-lg mt-3">
        <div class="bg-[#E2F2FF] px-5 py-3 rounded-lg">
            <p class="text-sm font-medium">New available health markers you've never tested. you can read about each one by tapping on a marker</p>
        </div>
        <div class="mt-2 mx-2">
            {#if ele}
                {#each ele.val as da}
                <a on:click={()=>categ(da.heading)} class="flex justify-between items-start">
                    <div class="flex mt-4">
                        {#if da.value == ''}
                        <p class="text-sm bg-gray-200 text-gray-700 flex w-[24px] h-[24px] items-center justify-center rounded-full">
                            <i class="fa fa-minus"></i>
                        </p>
                        {:else if da.value >= da.low && da.value <= da.high}
                            <p class="text-sm bg-green-200 text-green-700 flex w-[24px] h-[24px] items-center justify-center rounded-full">
                                <i class="fa fa-smile-o"></i>
                            </p>
                        {:else if (da.value < (da.low)) && (da.value >= (da.low - (da.low*0.1)))}
                            <p class="text-sm bg-yellow-200 text-yellow-600 flex w-[24px] h-[24px] items-center justify-center rounded-full">
                                <i class="fa fa-arrow-down"></i>
                            </p>
                        {:else if (da.value > (da.high)) && (da.value <= ((da.high*0.1) + da.high))}
                            <p class="text-sm bg-yellow-200 text-yellow-600 flex w-[24px] h-[24px] items-center justify-center rounded-full">
                                <i class="fa fa-arrow-up"></i>
                            </p>
                        {:else if (da.value < (da.low - (da.low*0.1)))}
                            <p class="text-sm bg-red-200 text-red-600 flex w-[24px] h-[24px] items-center justify-center rounded-full">
                                <i class="fa fa-arrow-down"></i>
                            </p>
                        {:else if (da.value > ((da.high*0.1) + da.high))}
                            <p class="text-sm bg-red-200 text-red-600 flex w-[24px] h-[24px] items-center justify-center rounded-full">
                                <i class="fa fa-arrow-up"></i>
                            </p>
                        {/if}
                        <h1 class="font-medium text-lg ml-1.5">{da.heading}</h1>
                    </div>
                    <div class="mt-3 text-right">
                        {#if da.value == ''}
                            <p><i class="fa-solid fa-minus text-xs"></i><i class="fa-solid fa-minus text-xs"></i></p>
                        {:else}
                            <p class="text-lg font-semibold">{da.value}</p>
                        {/if}
                        <p class="-mt-1 text-[#6C6C6E] text-base">{da.unit}</p>
                    </div>
                </a>
                {/each}
            {/if}
        </div>
    </div>
</div>
