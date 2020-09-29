[![DOI](https://zenodo.org/badge/291624470.svg)](https://zenodo.org/badge/latestdoi/291624470)

# Temporal Action Localization Visualization Tool ( TALVT )

An open source visualization tool for Temporal Action Localization in Constrained/Unconstrained Videos.

TALVT is a HTML and Javascript based Web application.



Features include:

1) The ability to visualize temporal segments of a particular Action Instance in the video
2) Has support upto 20 class Instance 
3) Can visualize both Supervised and Weakly Supervised Model Output
4) Includes code to convert output of two standard codes in Temporal Action Localization into visualizable format.

### Overall Flow

TALVT helps facilitate an end-to-end machine learning pipeline:

<p align="center">
  <img src="https://github.com/sauradip/action_localization_visualization/blob/master/pic/flow.png">
</p>

### To Run

Nothing to install ! 
Simple ! Double click the "src/index.html" it will pop up the web application for you. Happy Visualizing !

### Web Application Preview

TALVT web-application preview. The simplest tool to visualize temporal action localization code snippet available on GitHub for the <strong>First</strong> time

<p align="center">
  <img src="https://github.com/sauradip/action_localization_visualization/blob/master/pic/Code_sc.png">
</p>

Interface Design : 
* <strong>Select Video</strong> : You need to select a video for which you want to visualize the temporal segments
* <strong>Predicted File</strong> : The script which will be provided in this repository will convert the pytorch code output into a readable format (.txt)
* <strong>GT Annotation File</strong> : The sample scripts for GT data format for THUMOS14 and ActivityNet will be provided separately in .txt format
* <strong>Choose Method</strong> : It supports two methods namely "Supervised" and "Semi-Supervised". Based on the supervision for the pytorch code select this.

### Demo 

<p align="center">
  <img src="https://github.com/sauradip/action_localization_visualization/blob/master/pic/talvt_mod.gif">
</p>

### Data Format for Prediction and GT Annotation File

The following is the data format followed for visualization of temporal segments :

```bash
    [Start Time] [End Time] [Action Class]
   ```
### Coming Soon

* Sample Codes for generating data format of few state-of-the-art Pytorch Codes
* Sample codes for generating GT data format of any Dataset
* More powerful UI with a flask based python application


