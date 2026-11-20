---
date: 2026-11-17T09:41:00+02:00
published: false
author: Richard
category: Science & Technology
tags: []
series: ''
series_part: null
key_points: []
title: A simple GPS from first principle
image: ''
image_alt: ''
layout: post
card_items: []
---

# 

First you need a watch.

Knowing accurate time at your location gives you a nice estimate of your position along the vertical (longitude) but now where along the longitude are you? How do you calculate latitude when you are alone in a sun scorched desert.

Wait the sun? eureka. If I was at the poles the sun will be at an angle, but it's not at an angle so I must be somewhere between the poles. And If I can see the sun then I'm not on the side of the earth where the night is happening, I already knew this from my longitude but good to confirm.

But how can I know if I'm at the equator or at a latitude above or below it and how many degrees north or south?

## Longitude first

I want my longitude written down before anything else goes wrong. Right before my phone battery died, a friend in Athens sent me a message, so I set my watch to his time. My watch now says what time it is in Athens. The Earth turns 360° every 24 hours, which is 15° per hour. If the sun reaches its highest point over me 6 hours after it was over him, I'm 90° west of Athens. All I need is the exact moment of my own noon.

Catching noon is harder than it sounds, because the sun seems to hang at the top of its arc for ages. So I let the shadow do the work. I push a straight stick upright into flat sand. Every 10 minutes, from late morning until well past noon, I scratch a mark at the tip of the shadow and write the watch time next to it. The marks trace a curve, with the shadow shrinking on the way in and stretching on the way out, and the curve is a mirror image on either side of noon. So I find a morning mark and an afternoon mark that sit at the same distance from the stick, and the time halfway between them is noon, even if I was dozing when the shadow was shortest. Mine were at 5:30 PM and 6:30 PM Athens time, so my noon happened at 6:00 PM on the watch. As a bonus, a line from the base of the stick through the midpoint of those two marks runs exactly north to south.

Athens had its noon at 12:00 and I got mine at 6:00 PM, so the sun took 6 hours to get from him to me. Six times 15° is 90° west of Athens. Athens sits at about 23.7°E, which puts me at about 66°W. (Athens clocks follow a time zone and not the sun, and run about 25 minutes off real sun time. That is around 6° of longitude, and I'm letting it slide here.) The 66°W line is a long one that runs through Canada, Puerto Rico, Venezuela, Bolivia and Argentina, so longitude alone doesn't say where I am.

## Now the sun's height

Picture the one spot on Earth where the sun is straight overhead and a stick casts no shadow. Walk 111 km north and the sun is no longer straight overhead, because 'up' tilts as you walk around a ball. The Earth is about 40,000 km around and a circle has 360°, so each degree of walking is 40,000 divided by 360, about 111 km. Every 111 km I am from that spot, the sun sits 1° further from overhead. My shadow therefore tells me how many degrees I am from the place where the sun is overhead today. I need two numbers: where that place is, and how far from overhead the sun sits in my sky.

The Earth tilts by 23.5°, so the spot under the sun slides north and south through the year. It sits on the equator at the equinoxes (March 20 and September 22), reaches 23.5°N at the June 21 solstice, and 23.5°S on December 21. In between it moves like a kid on a swing, fast through the middle and slow at the ends. The rule of thumb I can carry in my head: after an equinox, the sun moves about 12° in the first month, 8° in the second and 3° in the third. That adds up to 23°, close enough. My watch says April 20, one month after the equinox, so the sun is over about 12°N.

Next I need my shadow in degrees, with no protractor. I cut my shoelace to the exact height of the stick, so that length becomes my unit. Then I draw the stick's triangle flat in the sand: one line as long as the stick, one line as long as the shadow, and a third line joining their ends, which is the sun's ray. If the shadow is exactly one shoelace long, the two sides are equal and meet at 90°, so the other two angles are equal and must add up to 90°. That makes them 45° each, and the sun is 45° from overhead.

Everything else comes from cutting angles in half. I pin one end of the shoelace to the top of the stick and swing it. It touches the base of the stick and also a point on the sun's ray. I fold the shoelace in half to find the midpoint of the line between those two spots, and a line from the top of the stick through that midpoint splits the 45° exactly in half, giving 22.5°. Splitting again between 22.5° and 45° gives 33.75°. I extend each of those rays down to the ground line, and they land at different distances from the stick: the 22.5° ray at about 0.4 of a shoelace, the 33.75° ray at about 0.67, and the 45° ray at exactly 1. That is a protractor made of sand.

My real shadow measured about two thirds of a shoelace, right on top of the 33.75° mark. Call it 34°. (A calculator later agrees: a 0.67 shadow means 33.8°.)

So the sun is over 12°N and it sits 34° from overhead where I stand. That puts me either 34° north of it, at 46°N, or 34° south of it, at 22°S. The shadow decides, because it always points away from the sun. To find which end of my noon line is south, I think back to sunrise. The sun came up in the east, and if I face east and turn a quarter turn to the right, I'm facing south. My noon shadow pointed that way. So the sun is north of me, I'm south of it, and 12°N minus 34° puts me at 22°S.

At 22°S and 66°W I'm in the high desert where Argentina meets Bolivia. The other answer, 46°N, would have dropped me in the forests of New Brunswick, a lovely place with no deserts.

## How good is my fix?

My shadow reading is good to about 2° and the sun's latitude from my rule of thumb to about 1°, so my latitude is off by up to 3°, roughly 330 km. Longitude has its own error, because the shadow barely changes near noon and my matched marks could put noon off by 10 minutes. That is 2.5° of longitude, about 250 km at this latitude. A rescue team gets a box a few hundred kilometers on a side. They will find the right region and then have a lot of desert to cover.

Look at where the error comes from. Everything here runs on slow things: a sun that takes a day to go around, a shadow I can only read to a couple of degrees, a watch where one minute of error costs 28 km at the equator. GPS keeps the same idea, turning a time into a distance, and swaps in something fast.

## Swap the sun for a satellite

A GPS satellite is a clock in orbit that keeps broadcasting what time it is and where it is. Each satellite sends its own repeating pattern of ones and zeros, so my phone can tell which one it is hearing, and the broadcast carries the satellite's orbit, so the phone knows where that satellite sits in space. The phone compares the satellite's time stamp with its own clock, and the gap is how long the signal took to arrive. Radio waves cover 300,000 km every second, so each millisecond of delay is 300 km and each nanosecond is 30 cm. That gives me my distance from the satellite, say 21,000 km. I can't tell in which direction, so all I know is that I'm somewhere on the surface of a hollow ball 21,000 km in radius, centered on the satellite.

A second satellite gives a second ball, say 22,500 km. Two overlapping balls meet along a circle, like the flat seam where two soap bubbles press together, so I'm somewhere on that circle. A third ball cuts through the circle at two points. One is on the surface of the Earth and the other is far out in space, so the phone throws away the space one and keeps the other.

The fourth satellite fixes the phone's clock. The satellites carry atomic clocks good to billionths of a second, while my phone has a cheap quartz clock. If it is off by a thousandth of a second, every distance is off by 300 km in the same direction, and the three balls miss each other. So the phone treats its own clock error as a fourth unknown and nudges it until all four balls meet at one point. Out comes my position and the correct time in a single step.

Written out, each satellite gives one equation. If satellite number i sits at (xi, yi, zi) and I'm at (x, y, z), the straight-line distance between us equals the speed of light times the signal's travel time. My clock error, b, hides inside every travel time. That makes four unknowns (x, y, z and b) and four equations, one per satellite. A phone usually hears 8 to 12 satellites at once, and the extra ones sharpen the answer.

One detail I like: relativity makes satellite clocks tick at a different rate from clocks on the ground. Their speed slows them down and the weaker gravity speeds them up, and the net result is that they gain 38 millionths of a second per day. Left alone, that would push GPS positions off by about 11 km every day, so the satellite clocks are set slightly slow before launch to cancel it.

The stick and the satellite run on the same idea. Turn a time into a distance, then let geometry shrink the list of places you could be. The stick gets me down to a region a few hundred kilometers wide, and GPS gets me down to a few meters.

## Why this only works because Earth has a clock

Look back at what each step leaned on. The sun gave me angles that map onto time at a clean 15° per hour, because the Earth spins once in 24 hours at a steady rate. A friend in Athens could tell me his noon because everyone agrees on a zero line and a clock to go with it. The 23.5° tilt turned the calendar into the sun's latitude. Earth hands us a spinning clock, an agreed zero line and a calendar in one package. Time is what turns the planet into a coordinate system, and that is why a stick, a watch and a date can find you in a desert.

Suppose we felt ambitious and wanted this method for a Moon colony or a Mars base. The stick still finds my local noon wherever there is a sun. The open question is what my watch should say.

## Taking the stick to the Moon

The Moon turns once relative to the sun every 29.5 Earth days. The sun crawls across its sky at about 0.5° per hour, 30 times slower than on Earth, and the lunar night lasts about two weeks. The matched shadow marks still work, but a morning mark and its afternoon partner now sit days apart.

Latitude gets easier. The Moon's axis tilts by only 1.5°, so the sun stays within about 1.5° of the lunar equator all year. There is no calendar correction to make, and the noon shadow angle is my latitude, give or take 1.5°.

Longitude is where time bites. On Earth my friend in Athens gave me a reference noon. On the Moon, someone has to say when the sun crossed the zero line of longitude, and my watch has to agree with them. The slow spin helps here. At 0.5° per hour, a minute of watch error is about 0.008°, roughly 250 meters on the surface, against about 28 km at the Earth's equator. The hard part is that nobody has agreed on what a lunar clock is. A clock on the Moon ticks faster than one on Earth, gaining about 58.7 microseconds per Earth day, with extra periodic wobbles on top. At the speed of light, 58.7 microseconds is about 17.6 km of ranging error per day if lunar satellites ran on Earth time. That is why the White House directed NASA in 2024 to deliver a plan for Coordinated Lunar Time, a Moon version of UTC, by the end of 2026.

## Taking the stick to Mars

Mars is the friendly one. Its day, a sol, lasts 24 hours 39 minutes 35 seconds, and its tilt is 25.2°, close to Earth's 23.5°. The sun still sweeps 15° per Mars hour, a Mars hour being one twenty-fourth of a sol, about 61.7 Earth minutes. The stick and shadow method would work almost as written, with three adjustments.

First, the watch has to count in sols. An Earth watch falls about 39.6 minutes behind Mars noon each day, and after a week it would put noon more than 4 hours off.

Second, Mars has its own Greenwich. Its zero line runs through the crater Airy-0, and the Martian version of Greenwich time is the mean solar time at that crater, called Coordinated Mars Time. Local solar time anywhere is that time plus the longitude divided by 15 for each hour. My watch would get its Airy-0 time from a master clock at the colony, kept in step with Earth over a radio link that takes between 3 and 22 minutes each way. The delay is predictable from where the two planets are, so it can be corrected.

Third, the calendar. A Mars year lasts about 669 sols, and Mars follows a more oval orbit than Earth, so its seasons differ in length. Northern spring lasts about 194 sols and northern autumn about 143. My rule of 12°, 8° and 3° per month would be wrong, and I would need a Mars almanac to tell me where the sun is overhead on a given sol.

## How the rovers do it

There is no GPS constellation at Mars today, so rovers combine four methods. Three of them echo what we did in the desert.

A clock and the sun give the rover its heading. A rover carries a clock kept in step with Earth's, and cameras that find the sun. Knowing the time and where the sun should sit in the Martian sky at that moment, it works out which way it is facing. That is our stick and shadow trick again, with a camera as the stick.

Radio from Earth gives the first fix. For Spirit and Opportunity, the absolute positions of the landing sites came from tracking their radio signals from Earth. The spin of Mars shows up as a daily rise and fall in the signal's frequency, and the pattern of that wobble depends on where the rover sits. After several days of tracking the team had a position, and photographs matched to landmarks confirmed it to within about 350 meters. The planet's rotation plays the part of the clock once more.

Counting steps keeps the position updated between fixes. Rovers take camera images every few feet and track features in them, allowing for wheel slip, a method called visual odometry. Tiny errors add up, and on long drives Perseverance's sense of its position could drift by up to about 35 meters.

Matching the picture to the map resets the error. After a drive, the rover sends a 360° panorama to Earth, where mapping experts match it to photos from the Mars Reconnaissance Orbiter, a process that can take a day or more. In 2026 NASA gave Perseverance a system called Mars Global Localization that does the matching on board. It takes about two minutes and pins the rover down to within roughly 25 centimeters.

The Moon had its own version of this. The Apollo lunar rover was tracked from Earth after the fact by radio, and its position was recovered to within about 25 meters.

So a rover does the GPS job with a clock, the sun, radio signals and orbital photos. A real Mars GPS would repeat our satellite story: a handful of orbiting clocks, an agreed zero line and an agreed time. Everything in this post comes back to the same thing. The Earth gave us time for free, and everywhere else we have to build it.
