import React from 'react';
import { graphql } from 'gatsby';
import CommonPostLayout from '../components/layouts/CommonPostLayout';
import FixedRightBar from '../components/fixedBars/FixedRightBar';
import Img from 'gatsby-image';

export const query = graphql`
	query($wpId: Int!) {
		wpPost(wpId: { eq: $wpId }) {
			wpId
			title
			featuredMedia {
				id
				childWpMedia {
					childFile {
						childImageSharp {
							id
							fluid {
								...GatsbyImageSharpFluid_tracedSVG
							}
						}
					}
				}
			}
		}
	}
`;

function WpPost({ data }) {
	const featuredImg = data.wpPost.featuredMedia.id ? (
		<Img fluid={data.wpPost.featuredMedia.childWpMedia.childFile.childImageSharp.fluid}></Img>
	) : (
		''
	);

	return (
		<>
			{featuredImg}
			<CommonPostLayout title={data.wpPost.title}>
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</CommonPostLayout>
			<FixedRightBar>
				<div>alsfjslkj</div>
			</FixedRightBar>
		</>
	);
}

export default WpPost;
