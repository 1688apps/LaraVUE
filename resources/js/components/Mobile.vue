    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading">My Mobile</div>
                    <div class="panel-body">
                  <h2>Laravel Vue JS CRUD Example Tutorial From Scratch</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
<b>Laravel Vue JS CRUD Example Tutorial From Scratch Step By step</b>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <button class="btn btn-success btn-xs pull-right">
                            + Add New Mobile
                        </button>
                        My Mobile
                    </div>
                    <div class="panel-body">
                        <table class="table table-bordered table-striped table-responsive"> 0">
                            <tbody>
                                <tr>
                                    <th>
                                        No.
                                    </th>
                                    <th>
                                        Title
                                    </th>
                                    <th>
                                        Information
                                    </th>
                                    <th>
                                        Action
                                    </th>
                                </tr>
                                <tr>
                                    <td>{{ index + 1 }}</td>
                                    <td>
                                        {{ mobiles.title }}
                                    </td>
                                    <td>
                                        {{ mobiles.mobileinformation }}
                                    </td>
                                    <td>
                                        <button class="btn btn-success btn-xs">Edit</button>
                                        <button class="btn btn-danger btn-xs">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" role="dialog" id="add_mobile_model">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"><span>×</span></button>
                        <h4 class="modal-title">Add New Mobile</h4>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-danger"> 0">
                            <ul>
                                <li>{{ error }}</li>
                            </ul>
                        </div>
                        <div class="form-group">
                            <label for="title">Title:</label>
                            
                        </div>
                        <div class="form-group">
                            <label for="mobileinformation">Information:</label>
                            <textarea name="mobileinformation" id="mobileinformation" cols="30" rows="5" class="form-control"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default">Close</button>
                        <button type="button" class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" role="dialog" id="update_mobile_model">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"><span>×</span></button>
                        <h4 class="modal-title">Update Mobile</h4>
                    </div>
                    <div class="modal-body">
 
                        <div class="alert alert-danger"> 0">
                            <ul>
                                <li>{{ error }}</li>
                            </ul>
                        </div>
 
                        <div class="form-group">
                            <label>Title:</label>
                            
                        </div>
                        <div class="form-group">
                            <label for="mobileinformation">Information:</label>
                            <textarea cols="30" rows="5" class="form-control"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success">Close</button>
                        <button type="button" class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    export default {
        data(){
            return {
                mobiles: {
                    title: '',
                    mobileinformation: ''
                },
                errors: [],
                mobiles: [],
                update_mobile: {}
            }
        },
        mounted()
        {
            this.readMobiles();
        },
        methods: {
            initAddMobile()
            {
                this.errors = [];
                $("#add_mobile_model").modal("show");
            },
            createMobile()
            {
                axios.mobile('/mobiles', {
                    title: this.mobiles.title,
                    mobileinformation: this.mobiles.mobileinformation,
                })
                    .then(response => {
                        this.reset();
                        $("#add_mobile_model").modal("hide");
                    })
                    .catch(error => {
                        this.errors = [];
                        if (error.response.data.errors.title) {
                            this.errors.push(error.response.data.errors.title[0]);
                        }
                        if (error.response.data.errors.mobileinformation) {
                            this.errors.push(error.response.data.errors.mobileinformation[0]);
                        }
                    });
            },
            reset()
            {
                this.mobiles.title = '';
                this.mobiles.mobileinformation = '';
            },
            readMobiles()
            {
                axios.get('/mobiles')
                    .then(response => {
                        this.mobiles = response.data.mobiles;
                    });
            },
            initUpdate(index)
            {
                this.errors = [];
                $("#update_mobile_model").modal("show");
                this.update_mobile = this.mobiles[index];
            },
            updateMobile()
            {
                axios.patch('/mobiles/' + this.update_mobile.id, {
                    title: this.update_mobile.title,
                    mobileinformation: this.update_mobile.mobileinformation,
                })
                    .then(response => {
 
                        $("#update_mobile_model").modal("hide");
 
                    })
                    .catch(error => {
                        this.errors = [];
                        if (error.response.data.errors.title) {
                            this.errors.push(error.response.data.errors.title[0]);
                        }
 
                        if (error.response.data.errors.mobileinformation) {
                            this.errors.push(error.response.data.errors.mobileinformation[0]);
                        }
                    });
            },
            deleteMobile(index)
            {
                let conf = confirm("Do you ready want to delete this mobile?");
                if (conf === true) {
                    axios.delete('/mobiles/' + this.mobiles[index].id)
                        .then(response => {
                            this.mobiles.splice(index, 1);
                        })
                        .catch(error => {
                        });
                }
            }
        }
    }