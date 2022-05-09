# Internet Score Checker

# For more details, view GitHub Wiki

## How it works
The internet score checker has a service that runs on each and every device that you wan't to have internet scored on. It selects a random website out of the top 1000 websites in the world (according to Similarweb). Then, it tests to see if 3 of those sites work. If 2/3 of those sites work, it will report as correctly. It reports internet to the scoring engine via a custom communciation. Each running instance of the internet score checker will communicate out to the internet scoring engine (custom scoring engine seperate of scoring engine), and report encrypted results to that server. Those results then can be read by scoring engine.
