import React, { useState, useEffect } from "react";
import fetch from "unfetch";

export interface SidebarData {
	sections: Section[];
	page: number;
	previous_page: null;
	next_page: null;
	per_page: number;
	page_count: number;
	count: number;
	sort_by: string;
	sort_order: string;
	categories: Category[];
}

export interface UserData {
	role: string;
}

export interface Category {
	id: number;
	url: string;
	html_url: string;
	position: number;
	created_at: Date;
	updated_at: Date;
	name: string;
	description: string;
	locale: Locale;
	source_locale: Locale;
	outdated: boolean;
}

export enum Locale {
	EnUs = "en-us",
}

export interface Section {
	id: number;
	url: string;
	html_url: string;
	category_id: number;
	position: number;
	sorting: Sorting;
	created_at: Date;
	updated_at: Date;
	name: string;
	description: string;
	locale: Locale;
	source_locale: Locale;
	outdated: boolean;
	parent_section_id: number | null;
	theme_template: ThemeTemplate;
}

export enum Sorting {
	Manual = "manual",
	Title = "title",
}

export enum ThemeTemplate {
	SectionPage = "section_page",
	SectionPagesChatPage = "section_pages/chat_page",
}

export default function Sidebar() {
	const [openId, setOpenId] = useState(0);
	const [data, setData] = useState<SidebarData>();
	const [currentUserData, setCurrentUserData] = useState<UserData>();
	const [openSectionId, setOpenSectionId] = useState<number>();
	const url =
		"/api/v2/help_center/en-us/sections.json?include=categories&per_page=100";
	const currentUserUrl = "/api/v2/users/me.json";

	function expand(id: number) {
		setOpenId((prevState) => {
			if (prevState === id) {
				return 0;
			}
			return id;
		});
	}

	useEffect(() => {
		fetch(url)
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error(response.statusText);
				}
			})
			.then((responseJson) => {
				setData(responseJson);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		fetch(currentUserUrl)
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error(response.statusText);
				}
			})
			.then((responseJson) => {
				setCurrentUserData(responseJson);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		getCurrentCategory();
	}, [data]);

	function getPageInfo() {
		let _t = window.location.href.split("/hc/");
		_t = _t[1].split("-")[1].split("/");
		return { type: _t[1], id: _t[2] };
	}

	const categories = data && data.categories;
	const sections = data && data.sections;

	function getCurrentCategory() {
		const page = getPageInfo();
		const pageType = page.type;
		let pageId = parseInt(page.id);

		if (pageType === "sections") {
			const section = sections?.filter(
				(section) => section.id === pageId
			)[0];

			setOpenSectionId(section ? section.id : pageId);

			pageId = section ? section.category_id : pageId;
		}

		if (pageType === "articles") {
			const div = document.getElementById("section-id");
			let sectionId = 0;
			if (div && div.dataset["sectionId"]) {
				sectionId = parseInt(div.dataset["sectionId"]);
			}
			const section = sections?.filter(
				(section) => section.id === sectionId
			)[0];

			setOpenSectionId(section ? section.id : 0);

			pageId = section ? section.category_id : pageId;
		}

		if (pageId !== openId) {
			expand(pageId);
		}
	}

	if (document.getElementById("home")) {
		return <> </>;
	}

	return (
		<div id="sidebar" className="sidebar-panel">
			<ul className="sidebar">
				<li className="sidebar-item sidebar-home open material-icons-big">
					<a
						href="https://www.configura.com/academy/cet-designer"
						className="custom-sidebar-item-title"
						target="_blank"
					>
						<i className="material-icons custom-icon-margin-right blue-icon">
							school
						</i>
						Academy and training
					</a>
				</li>
				<li className="sidebar-item sidebar-home open material-icons-big">
					<a
						href="https://www.configura.com/products/system-recommendations/cet-designer"
						className="custom-sidebar-item-title"
						target="_blank"
					>
						<i className="material-icons custom-icon-margin-right blue-icon">
							computer
						</i>
						System recommendations
					</a>
				</li>
				<li className="sidebar-item sidebar-home open material-icons-big">
					<a
						href="https://www.configura.com/products/release-notes/cet-designer"
						className="custom-sidebar-item-title"
						target="_blank"
					>
						<i className="material-icons custom-icon-margin-right blue-icon">
							import_contacts
						</i>
						Release notes
					</a>
				</li>
				<li className="sidebar-item sidebar-home open material-icons-big">
					<a
						href=" https://www.configura.com/my/forum"
						className="custom-sidebar-item-title"
						target="_blank"
					>
						<i className="material-icons custom-icon-margin-right blue-icon">
							forum
						</i>
						Forums
					</a>
				</li>
				{currentUserData?.role !== "end-user" && (
					<li className="sidebar-item sidebar-home open custom-margin-bottom material-icons-big">
						<a
							href="https://support.configura.com/hc/en-us/articles/360050652674"
							className="custom-sidebar-item-title"
							target="_blank"
						>
							<i className="material-icons custom-icon-margin-right blue-icon">
								bug_report
							</i>
							Known Issues
						</a>
					</li>
				)}

				{categories &&
					categories
						.filter((category) => category.name !== "Contact Us")
						.map((category, index) => {
							return (
								<li
									className={
										category.id === openId
											? "sidebar-item open"
											: "sidebar-item"
									}
									key={index}
									onClick={(e) => {
										expand(category.id);
									}}
								>
									<h4 className="sidebar-item-title">
										{category.name}
									</h4>
									<ul onClick={(e) => e.stopPropagation()}>
										{openId === category.id &&
											sections &&
											sections
												.filter(
													(section) =>
														section.category_id ===
															category.id &&
														!section.parent_section_id
												)
												.map((section) => {
													return (
														<li key={section.id}>
															<a
																href={
																	section.html_url
																}
																className={
																	section.id ===
																	openSectionId
																		? "sidebar-item-link-open"
																		: "sidebar-item-link"
																}
															>
																{section.name}
															</a>
														</li>
													);
												})}
									</ul>
								</li>
							);
						})}
			</ul>
		</div>
	);
}
