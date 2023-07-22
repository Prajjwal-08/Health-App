<script>
    import Carousel from 'svelte-carousel';
    import { browser } from '$app/environment';
    import Chart from "chart.js/auto";
    import { onMount } from "svelte";
	import {test,cat} from "$lib/store";
	import {category, paget, articles} from "$lib/data"

    var ctx;
    let mon,i;
    let months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
    let value=[]
    var ele;

    for ( i = 0; i < category.length; i++) {
        if (category[i].key == $cat) {
            ele = category[i];
            break;
        }
    }

    for (i = 0; i < 11; i++) {
        value[i] = (Math.random() * (ele?.val.high*1.5) + (ele?.val.low*0.5))
    }
    // console.log(ele.val.value);
    value[i] = ele?.val.value;
    // console.log(value);
    
    let bg =[];
    for(let i=0; i<value.length; i++){
        if(ele?.val.high === ''){
            if(value[i] >= ele?.val.low)
            {bg = [...bg,'#74F786'] } // GREEN
            else if(value[i] > (ele?.val.low - (ele?.val.low*0.1)))
            {bg = [...bg,'#f7d773'] } // YELLOW
            else
            {bg = [...bg,'#FF5B5B'] }  //RED
        }
        else{
            if(value[i] >= ele?.val.low && value[i] <= ele?.val.high)
            {bg = [...bg,'#74F786'] } // GREEN
            else if(value[i] > (ele?.val.low - (ele?.val.low*0.1)) && value[i] < ((ele?.val.high*0.1) + ele?.val.high) )
            {bg = [...bg,'#f7d773'] } // YELLOW
            else
            {bg = [...bg,'#FF5B5B'] }  //RED
        }
    }

    const d = new Date();

    if (d.getDate() == 29 || d.getDate() == 30 || d.getDate() == 31) {
        d.setDate(28);
    }

    let m12 =[];
    for(let i=0; i<12; i++){
        
        m12 = [months[d.getMonth()],...m12]
        d.setMonth(d.getMonth() - 1)
    }

   console.log(m12);
    
    let label = m12.slice(0,mon);

    const datas = {
        labels:  label,
        datasets: [
            {
                data: value,
                backgroundColor: "gray",
                borderColor: "gray",
                borderWidth: 2,
                hoverOffset: 12,
                type:'line'
            },
            // {
            //     data: value,
            //     backgroundColor: bg,
            //     borderColor: "grey",
            //     type:'bar'
            // }
        ],
    };

    const canvasBackgroundColor = {
        id: 'canvasBackgroundColor',
        beforeDraw(chart, args, pluginOptions){
            // console.log(chart);
            const { ctx, chartArea: {top, bottom, left, right, width, height}, scales: {x,y} } = chart;
            ctx.fillStyle = '#DEDEDE';
            ctx.fillRect(left, y.getPixelForValue(ele?.val.high), width, y.getPixelForValue(ele?.val.low) - y.getPixelForValue(ele?.val.high))
        }
    }

    const config = {
        type: "line",
        data: datas,
        options: {
            maintainAspectRatio: false,
            responsive: true,
            tension: 0.4,
            plugins: {
                legend: {
                    display:false,
                },
            },
            interaction: {
                mode: "index",
                intersect: false,
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                },
                y: {
                    grid: {
                        display: true,
                        // color:'blue',
                        // z:10
                        // backgroundColor:
                    },
                    afterBuildTicks: axis => {
                        // let values = axis.ticks.map(t => t.value);
                        let max = ele?.val.high;
                        let min = ele?.val.low;
                        axis.ticks = [
                            { value: min  },
                            { value: max  }
                        ]
                    },
                    ticks: {
                        display: true,
                        callback: (v, i) => i ? ele?.val.high : ele?.val.low
                    },
                },
            },
        },
        plugins: [canvasBackgroundColor]
    };
    var chart;

    onMount(() => {
        chart = new Chart(ctx, config);
    });
    function val(p) {
        console.log(mon);
        console.log(m12);
        chart.data.labels= m12.slice(12-p,12);
        chart.data.datasets[0].data= value.slice(12-p,12);
        chart.data.datasets[0].backgroundColor= bg.slice(12-p,12);
        chart.update();
    }
    
    let cate = [
        {img: 'B.png', title: 'Blood'},
        {img: 'H.png', title: 'Heart'},
        {img: 'Ho.png', title: 'Hormones'},
        {img: 'I.png', title: 'Immunity'},
        {img: 'K.png', title: 'Kidneys'},
        {img: 'L.png', title: 'Liver'},
        {img: 'Me.png', title: 'Metabolism'},
        {img: 'Mi.png', title: 'Minerals'},
        {img: 'V.png', title: 'Vitamins'},
    ];

    let maxrg = ((ele?.val.high/2) + ele?.val.high);
    let lows = ((ele?.val.low / maxrg) * 100);
    let highs = (100-((ele?.val.high / maxrg) * 100));
    // let asd = ((ele?.val.value / maxrg) * 100);
    let asd = (ele?.val.value / maxrg) * 100;
    // asd = Math.round(asd);
    console.log(highs, lows, maxrg, asd);

    if(ele?.val.value > maxrg){
        asd = 100;
    }else if(ele?.val.value < 0){
        asd = 0;
    }

    function check(){
        for ( i = 0; i < paget?.length; i++) {
            for(let j=0; j < paget[i]?.val.length; j++){
                if (paget[i]?.val[j].heading == $cat) {
                    test.set(paget[i]?.key)
                    window.location.href="/test"
                    break;
                }
            }
        }
    }
</script>


<div class="flex z-50 fixed top-0 w-full px-6 py-3 items-center shadow-sm bg-white">
    <a on:click={()=>check()}><i class="fa fa-arrow-left text-xl"></i></a>
    <div class="circle absolute right-5 flex items-center justify-center border rounded-full w-10 h-10 bg-[#CCC9DC]">
        <i class="fa fa-user text-2xl text-white"></i>
    </div>
</div>

<div class="main w-full bg-[#F6F5FB] pt-24 pb-5">
    <div class="bg-white rounded-lg w-p-90 m-auto py-3 px-4 mb-5">
        {#if ele?.val.value == ''}
            <p class="text-[#5F5E62] font-medium text-sm">
                No data yet
            </p>
        {:else if ele?.val.value >= ele?.val.low && ele?.val.value <= ele?.val.high}
            <p class=" font-medium text-sm bg-green-200 text-green-700 w-fit rounded-2xl px-3 py-1">
                <i class="fa fa-smile-o"></i> Normal
            </p>
        {:else if (ele?.val.value < (ele?.val.low)) && (ele?.val.value >= (ele?.val.low - (ele?.val.low*0.1)))}
            <p class=" font-medium text-sm bg-yellow-200 text-yellow-600 w-fit rounded-2xl px-3 py-1">
                <i class="fa fa-arrow-down"></i> Low
            </p>
        {:else if (ele?.val.value > (ele?.val.high)) && (ele?.val.value <= ((ele?.val.high*0.1) + ele?.val.high))}
            <p class=" font-medium text-sm bg-yellow-200 text-yellow-600 w-fit rounded-2xl px-3 py-1">
                <i class="fa fa-arrow-up"></i> High
            </p>
        {:else if (ele?.val.value < (ele?.val.low - (ele?.val.low*0.1)))}
            <p class=" font-medium text-sm bg-red-200 text-red-600 w-fit rounded-2xl px-3 py-1">
                <i class="fa fa-arrow-down"></i> Very Low
            </p>
        {:else if (ele?.val.value > ((ele?.val.high*0.1) + ele?.val.high))}
            <p class=" font-medium text-sm bg-red-200 text-red-600 w-fit rounded-2xl px-3 py-1">
                <i class="fa fa-arrow-up"></i> Very High
            </p>
        {/if}
        <div class="block">
            <h2 class="text-3xl font-bold w-fit m-auto mt-1.5">{ele?.val.name == undefined ? '' : ele?.val.name}</h2>
            <div class="block w-fit m-auto text-center">
                <div class="flex justify-center mt-5">
                    {#if ele?.val.value != ""}
                        <p class="text-2xl font-bold">{ele?.val.value == undefined ? '' : ele?.val.value}</p>
                    {:else}
                        <i class="fa-solid fa-minus text-lg"></i>
                        <i class="fa-solid fa-minus text-lg"></i>
                    {/if}
                </div>
                <h4 class="text-lg font-normal text-[#5F5E62] tracking-widest">{ele?.val.symbol == undefined ? '' : ele?.val.symbol}</h4>
            </div>
            <div class="relative w-p-98 m-auto rounded-lg flex mt-4 justify-center mb-20">
                <div class="w-full rounded-lg p-1 bg-[#F6F5FB]"></div>
                <div style="left: {lows}%; right: {highs}%;" class=" absolute p-1 bg-black {ele?.val.low == 0 ? 'rounded-l-lg' : ele?.val.high == '' ? 'rounded-r-lg w-[254px] right-0' : ''}">
                    <div class="relative">
                        {#if ele?.val.low != 0}
                        <div class="absolute -left-5">
                            <p class="text-xl font-bold mt-3">{ele?.val.low == undefined ? '' : ele?.val.low}</p>
                            <h4 class="text-sm font-normal text-[#5F5E62] tracking-widest">{ele?.val.symbol == undefined ? '' : ele?.val.symbol}</h4>
                        </div>
                        {/if}
                        {#if ele?.val.high != ''}
                        <div class="absolute -right-6">
                            <p class="text-xl font-bold mt-3">{ele?.val.high == undefined ? '' : ele?.val.high}</p>
                            <h4 class="text-sm font-normal text-[#5F5E62] tracking-widest">{ele?.val.symbol == undefined ? '' : ele?.val.symbol}</h4>
                        </div>
                        {/if}
                    </div>
                </div>
                {#if ele?.val.value >= ele?.val.low && ele?.val.value <= ele?.val.high}
                    <div class="absolute w-[5px] h-5 bg-green-500 -top-1.5" style="left:{asd}%" />
                {:else if ele?.val.value < ele?.val.low && ele?.val.value >= ele?.val.low - ele?.val.low * 0.1  } 
                    <div class="absolute w-[5px] h-5 bg-yellow-500 -top-1.5" style="left:{asd}%" />
                {:else if ele?.val.value > ele?.val.high && ele?.val.value <= ele?.val.high + ele?.val.high * 0.1  } 
                    <div class="absolute w-[5px] h-5 bg-yellow-500 -top-1.5" style="left:{asd}%" />
                {:else} 
                    <div class="absolute w-[5px] h-5 bg-red-500 -top-1.5" style="left:{asd}%" />
                {/if}
            </div>
            <div class="bg-[#E2F2FF] px-4 py-3 rounded-lg font-medium w-p-98 m-auto">
                This is where you'll see your Biomarker value and its position on the range spectrum.
            </div>
        </div>
    </div>

    <div class="w-full m-auto py-3 px-5 mb-5">
        {#if browser}
			<Carousel duration={500} particlesToShow={1} dots={true} arrows={false}>
				{#each ele?.info as info}
					<div class="px-2">
						<div class="px-2 py-4 bg-white rounded-lg">
							<h1 class="font-bold ml-3">{info.title}</h1>
							<img class="mt-5 w-p-98 m-auto" src="/category/{info.img}" alt="img" />
							<p class="mt-3 ml-2 w-80 font-medium">{info.desc}</p>
						</div>
					</div>
				{/each}
			</Carousel>
		{/if}
    </div>

    <div class="bg-white rounded-lg w-p-90 m-auto py-3 px-5 mb-5">
        <div class=" flex justify-between mb-5">
            <h2 class="font-bold text-xl">Progress over time</h2>
            <select bind:value={mon} on:change={val(mon)} class="border shadow-sm rounded-md p-1 focus:outline-none focus:shadow-md">
                <option value=2>2 months</option>
                <option value=4>4 months</option>
                <option value=6>6 months</option>
                <option value=8>8 months</option>
                <option value=12 selected>12 months</option>
            </select>
        </div>
        <div class="dataset w-full">
            <canvas bind:this={ctx} id="chart" class="w-full" style="position: relative; height: 80vh/500px/whatever"/>
        </div>
        <div class="bg-[#E2F2FF] px-4 py-3 rounded-lg font-medium w-p-98 m-auto">
            After your first re-test, you will be able to track your progress and how your body changes over time.
        </div>
    </div>
    <div class="bg-white rounded-lg w-p-90 m-auto py-3 px-5 mb-5">
        <h2 class="font-bold text-xl mb-5">How does it impact your body?</h2>
        <div class="flex flex-wrap gap-2">
            {#each cate as c}
                <div class="bg-[#F6F5FB] flex items-center pl-2 pr-4 py-1 rounded-full">
                    <img src="/{c.img}" alt="{c.img}" class="w-5 h-5 mr-1">
                    <p class="">{c.title}</p>
                </div>
            {/each}
        </div>
    </div>
    <div class="font-bold text-xl mt-6 mb-5 w-p-90 m-auto">Related articles</div>
    
    <div class="w-full m-auto py-3 px-5 mb-5">
        {#if browser}
            <Carousel duration={500} particlesToShow={1} autoplay dots={false} arrows={false}>
                <div>
                    <div class="box m-auto flex w-[95%] border p-4 rounded-lg bg-white">
                        <div class="block w-4/6">
                            <div class="bg-[#F6F5FB] mb-2 items-center rounded-full w-fit h-fit px-4 py-1">
                                <p class="text-[#7B65CF] font-bold">Basic</p>
                            </div>
                            <p class="text-black mb-5 font-medium">Hematocrit - what do high and low levels mean?</p>
                            <p class="text-[#646464]">01.11.2022</p>
                        </div>
                        <div class="flex w-2/6 justify-center items-center">
                            <img src="/blog-1.png" alt="img" class="w-[100px] h-[110px]">
                        </div>
                    </div>
                </div>
            </Carousel>
        {/if}
    </div>
    
    <div class="bg-white rounded-lg w-p-90 m-auto py-3 px-5 mb-5">
        <h2 class="font-bold text-xl mb-4">Time to add some data!</h2>
        <img src="/add-data.png" alt="" class="w-p-90 m-auto rounded-xl mb-4">
        <h2 class="font-medium text-[16px] w-p-90 m-auto mb-4">Book your first blood test appoinment and track all your biomarkers over time.</h2>
        <button class="bg-black text-center w-p-98 text-white py-4 rounded-lg mb-1">Book an appointment</button>
    </div>
</div>