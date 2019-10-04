import React from 'react';
import MainMenu from '../components/navigation/MainMenu';
import scopedStyle from './index.module.scss';
import Slider from '../components/slider/Slider';

export default () => (
	<div>
		<h1>Index Page</h1>

		<div>
			<MainMenu></MainMenu>
		</div>

		<div>
			<Slider></Slider>
		</div>
		<div>FROM HERE</div>

		<i className="icon"></i>


		<div>TO HERE</div>

		<hr />
		<br />

		<div className="container">
			<div className={`row ${scopedStyle.testRow}`}>
				<div className="col-xs-1">col</div>
				<div className="col-xs-1">col</div>
				<div className="col-xs-1">col</div>
				<div className="col-xs-1">col</div>
				<div className="col-xs-1">col</div>
				<div className="col-xs-1">col</div>
				<div className="col-xs-1">col</div>
				<div className="col-xs-1">col</div>
				<div className="col-xs-1">col</div>
				<div className="col-xs-1">col</div>
				<div className="col-xs-1">col</div>
				<div className="col-xs-1">col</div>
			</div>

			<div className="row">
				<div className="col-xs-2">
					<div className="bg-grey text-justify pa-3">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid quod laudantium consequatur ea magnam?
						Voluptatem pariatur eum, maxime laborum laudantium doloribus sit corrupti consequuntur error, consequatur ab
						at reiciendis odit! Qui, iure perferendis nihil laudantium impedit illum esse nemo ullam sequi magnam a
						tempora sapiente dolor, libero repellendus. Modi, provident!
					</div>
				</div>
				<div className="col-xs-2">
					<div className="bg-grey pa-3">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid quod laudantium consequatur ea magnam?
						Voluptatem pariatur eum, maxime laborum laudantium doloribus sit corrupti consequuntur error, consequatur ab
						at reiciendis odit! Qui, iure perferendis nihil laudantium impedit illum esse nemo ullam sequi magnam a
						tempora sapiente dolor, libero repellendus. Modi, provident!
					</div>
				</div>
				<div className="col-xs-2">
					<div className="bg-grey">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid quod laudantium consequatur ea magnam?
						Voluptatem pariatur eum, maxime laborum laudantium doloribus sit corrupti consequuntur error, consequatur ab
						at reiciendis odit! Qui, iure perferendis nihil laudantium impedit illum esse nemo ullam sequi magnam a
						tempora sapiente dolor, libero repellendus. Modi, provident!
					</div>
				</div>
				<div className="col-xs-2">
					<div className="bg-grey">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid quod laudantium consequatur ea magnam?
						Voluptatem pariatur eum, maxime laborum laudantium doloribus sit corrupti consequuntur error, consequatur ab
						at reiciendis odit! Qui, iure perferendis nihil laudantium impedit illum esse nemo ullam sequi magnam a
						tempora sapiente dolor, libero repellendus. Modi, provident!
					</div>
				</div>
				<div className="col-xs-2">
					<div className="bg-grey">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid quod laudantium consequatur ea magnam?
						Voluptatem pariatur eum, maxime laborum laudantium doloribus sit corrupti consequuntur error, consequatur ab
						at reiciendis odit! Qui, iure perferendis nihil laudantium impedit illum esse nemo ullam sequi magnam a
						tempora sapiente dolor, libero repellendus. Modi, provident!
					</div>
				</div>
				<div className="col-xs-2">
					<div className="bg-grey">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid quod laudantium consequatur ea magnam?
						Voluptatem pariatur eum, maxime laborum laudantium doloribus sit corrupti consequuntur error, consequatur ab
						at reiciendis odit! Qui, iure perferendis nihil laudantium impedit illum esse nemo ullam sequi magnam a
						tempora sapiente dolor, libero repellendus. Modi, provident!
					</div>
				</div>
			</div>
		</div>
	</div>
);
