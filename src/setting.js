import './setting.scss';
import ReactNotification, { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';


/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	Panel,
	PanelRow,
	Placeholder,
	Spinner,
} = wp.components;

const {
	Component,
	Fragment,
} = wp.element;


class Settings extends Component {

	constructor( props ) {
	
		super( props );

		this.state = {
			isAPILoaded: false,
			isAPISaving: false,
			select_option: '-1',
			el_widget_list: [],
			selected_widget: [],
			search: '',
			notification: null,
			
		}

		this.el_widgets = [];
		this.search_widget = [];

		this.changeStatus = this.changeStatus.bind( this );
		this.changeOptions = this.changeOptions.bind( this );
		this.selectCheckbox = this.selectCheckbox.bind( this );
		this.selectApply = this.selectApply.bind( this );
	}



	// Formatting to all the previous setting when the component is mounted.
	async componentDidMount() {

		// Making array of object.
		let { el_widget_list } = this.state

		Object.keys( ewm_widgets ).map( ( value,index ) => {

			el_widget_list[index] = {
				title: ewm_widgets[value],
				slug: value,
				status: true,
			};
		} );

		this.setState( { el_widget_list } );
		this.search_widget = this.state.el_widget_list;

		// Getting data from setting model api.
		wp.api.loadPromise.then( () => {

			this.widget = new wp.api.models.Settings();

			if( ! this.state.isAPILoaded ) {

				this.widget.fetch().then( response => {

					let { el_widget_list } = this.state;

					Object.keys( this.state.el_widget_list ).map( ( index ) => {

						if ( response.ewm_widget.some( (val) => val === this.state.el_widget_list[index].slug ) ) {

							el_widget_list[index].status = ! this.state.el_widget_list[index].status
							this.el_widgets.push( this.state.el_widget_list[index].slug );
						}
					})
					this.setState( { el_widget_list } );
					this.setState( { isAPILoaded: true } );
				} )
			}
		} )
	}





	// Renders search result.
	searchResult( e ) {

		this.setState( { search: e.target.value } );
		let { el_widget_list } = this.state,i=0;

		if( '' != e.target.value ) {
			
			el_widget_list = [];

			Object.keys( this.search_widget ).map( ( index ) => {
				if( this.search_widget[index].title.toUpperCase().indexOf( e.target.value.toUpperCase() ) > -1 ) {

					el_widget_list.push( this.search_widget[index] );
				}
			});
		} else {

			el_widget_list = this.search_widget;
		}

		this.setState( { el_widget_list } );
	}





	// Selected elements pushed into new array.
	selectCheckbox( e, index ) {
		
		let { selected_widget } = this.state;

		// Select those which are checked.
		if( e.target.checked ) {

			selected_widget.push( this.state.el_widget_list[index].slug );
		} else {

			let itemIndex = this.state.selected_widget.indexOf( this.state.el_widget_list[index].slug );
			selected_widget.splice( itemIndex, 1 );
		}

		this.setState( { selected_widget } );
		console.log( this.state.selected_widget );
	}



	// Selecting particular option from select.
	selectOption( e ) {

		this.setState( { select_option: e.target.value } );
	}



	// Selecting all the wigdets.
	selectAll( e ) {

		let { selected_widget } = this.state;

		if( e.target.checked ) {

			Object.keys( this.state.el_widget_list ).map( ( index ) => {

				selected_widget.push( this.state.el_widget_list[index].slug );
			});			

			this.setState( { selected_widget } );

		} else {

			this.setState( { selected_widget: [] } );
		}
	}




	// For saving the setting changes in the setting api.
	changeOptions( option, value ) {

		this.setState( { isAPISaving: true } );

		const model = new wp.api.models.Settings( {
			[option]: value
		} );

		model.save().then( ( response,status ) => {

			store.removeNotification( this.state.notification );
			console.log( response );

			if ( 'success' == status ) {

				this.addNotification( __( 'Settings Saved' ), 'success' );
				this.setState( { isAPISaving: false } );
			}
		} )
	}



	// Changes after clicking the apply button.
	selectApply() {

		if( '-1' != this.state.select_option ) {

			let { el_widget_list } = this.state;

			if( this.state.selected_widget.length != 0 ) {

				if( 'activate' == this.state.select_option ) {

					Object.keys( this.state.el_widget_list ).map( ( index ) => {

						if ( this.state.selected_widget.some( (val) => val === this.state.el_widget_list[index].slug ) && ! this.state.el_widget_list[index].status ) {
							el_widget_list[index].status = ! el_widget_list[index].status;

							let itemIndex = this.el_widgets.indexOf( this.state.el_widget_list[index].slug );
							this.el_widgets.splice( itemIndex, 1 );
						}
					})
					this.addNotification( __( 'Activating Widget...' ), 'info' );

				} else if( 'deactive' == this.state.select_option ) {

					Object.keys( this.state.el_widget_list ).map( ( index ) => {

						if ( this.state.selected_widget.some( (val) => val === this.state.el_widget_list[index].slug ) && this.state.el_widget_list[index].status ) {
							el_widget_list[index].status = ! el_widget_list[index].status;

							this.el_widgets.push( this.state.el_widget_list[index].slug );
						}
					})
					this.addNotification( __( 'Deactivating Widget...' ), 'info' );
				}
	
				// To uncheck all the selection after applying the bulk action.
				this.setState( { selected_widget: [] } );

				// To select the default option bulk action.
				this.setState( { select_option: '-1' } );

				// Again upadating the state.
				this.setState( { el_widget_list } );

				// Passing the updated blacklist widget to settings api.
				this.changeOptions( 'ewm_widget', this.el_widgets);
			} else {

				// To select the default option bulk action.
				this.setState( { select_option: '-1' } );

				this.addNotification( __( 'Choose atleast One Option' ), 'warning' );
			}
		} else {

			this.addNotification( __( 'Need to Choose Other Options' ), 'warning' );
		}
	}



	// For changing the status from activate to deactivate and vice versa.
	changeStatus( index ) {

		let { el_widget_list } = this.state;
		el_widget_list[index].status = ! this.state.el_widget_list[index].status
		
		this.setState( { el_widget_list } );

		// If the status is false then push otherwise pop.
		if( ! this.state.el_widget_list[index].status ) {

			this.addNotification( __( 'Deactivating Widget...' ), 'info' );
			this.el_widgets.push( this.state.el_widget_list[index].slug ); 
		} else {

			this.addNotification( __( 'Activating Widget...' ), 'info' );
			let itemIndex = this.el_widgets.indexOf( this.state.el_widget_list[index].slug );
			this.el_widgets.splice( itemIndex, 1 );
		}

		this.changeOptions( 'ewm_widget', this.el_widgets);
	}




	// Handling the notification for state updating.
	addNotification( message, status ) {
		const notification = store.addNotification({
			message: message,
            type: status,                            // 'default', 'success', 'info', 'warning'
            container: 'bottom-left',                // where to position the notifications
            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
            dismiss: {
			  duration: 2000,
			  showIcon: true,
			},
		})
		
		this.setState( { notification } );
	}



	render() {
		if( ! this.state.isAPILoaded ) {

			return (
				<Placeholder>
					<Spinner />
				</Placeholder>
			)
		}

		return(
			<Fragment>
				<ReactNotification />

				<header class="ewm-setting-header">
					<div class="ewm-setting-title">
						<h1>{ __( 'Elementor Widget Manager', 'el-widget-manager' ) }</h1>
						<p>by <a href="https://ideabox.io" target="_blank">IdeaBox Creations</a></p>
					</div>
				</header>

				<Panel className="ewm-setting-container">
					<div className="ewm-select-options-container">
						<div className="ewm-select-options-container-checkbox">
							<input type='checkbox' className="ewm-select-options-checkbox"  onChange={ ( e ) => this.selectAll( e ) } />
						</div>

						<div className="ewm-select-options-container-select">
							<select value={ this.state.select_option } onChange={ ( e ) => this.selectOption( e ) }>
								<option value="-1">{ __( 'Bulk Actions' ) }</option>
								<option value="activate">{ __( 'Activate' ) }</option>
								<option value="deactive">{ __( 'Deactivate' ) }</option>
							</select>	
						</div>

						<div className="ewm-select-options-container-button">
							<button className="button" onClick={ this.selectApply }>{ __( 'Apply' ) }</button>
						</div>

						<div class="ewm-select-options-container-search">
							<input  
								type="text"
								disabled={ this.state.isAPISaving }
								class="ewm-select-options-searchbox"
								value={ this.state.search }
								placeholder={ __( 'Search Widget' ) }
								onChange={ ( e ) => this.searchResult( e ) }
							/>
						</div>
					</div>

					<PanelRow>
						{
							this.state.el_widget_list != ''?
								<ul className="ewm-setting-list">
									{
										Object.keys( this.state.el_widget_list ).map( ( index ) => {
											return (
												<li className={ "ewm-setting-list-item " + (this.state.el_widget_list[index].status? 'deactivate':'activate' ) }>
													<div className="ewm-setting-list-item-container-checkbox">
														<input 
															type='checkbox'
															className="ewm-setting-list-item-checkbox"
															onChange={ ( e ) => this.selectCheckbox( e, index ) }
															checked={ this.state.selected_widget.some( (val) => val === this.state.el_widget_list[index].slug ) }
														/>
													</div>

													<div className="ewm-setting-list-item-container-title">
														<h4>{ __( this.state.el_widget_list[index].title ) }</h4>
													</div>

													<div className="ewm-setting-list-item-container-button">
														<button id={ 'item-' + index } onClick={ () => this.changeStatus( index ) } className="ewm-setting-list-button">
															{ this.state.el_widget_list[index].status? __( 'Deactivate' ):__( 'Activate' ) }
														</button>
													</div>
												</li>
											)
										})
									}
								</ul>
							:	<div className="ewm-empty-search"><p>{ __( 'Oops! Nothing Found' ) }</p></div>
						}
					</PanelRow>
				</Panel>
			</Fragment>
		)
	}
}

export default Settings;